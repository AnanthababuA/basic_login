import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
  // imports: [DataTablesModule, CommonModule,  MatButtonModule, MatDialogModule ]
})
export class LogViewerComponent {
  @ViewChild('picker') picker: MatDateRangePicker<Date>;

  selectclientchecked: boolean = true;

  selectedLogType: any;

  dtOptions : any;
  // dtOptions: any = {};
  // showTable : boolean = false;

  // @ViewChild(DataTableDirective, { static: false })
  // datatableElement: DataTableDirective;

  dateRangeControl = new FormControl();

  showStart = 'Date Selected: ';
  @ViewChild('start') start: ElementRef;
  @ViewChild('end') end: ElementRef;

  weekObj = {};

  secondFormGroup: FormGroup;
  use_subclients: any;
  unitName: any;
  unit_id: any;
  unitType: any;
  // logtypes: any;
  logtypes: { name: string, value: string }[] = [];
  log_values12: any[] = []; 
  log_value: any;
  minDate: Date | null = null;
  includeSubClients = false;

  errorMessage: string; 

  selectedTabIndex = 0; // Default to Log Search tab
  showInner = false;
  maxDate: Date;
  dateRange: FormGroup;
  checkboxEnabled = false;

  logdata: any;
  // logdata: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  loaderStatus: string = 'Loading...';
  loading = true; // Initialize the loading state to true
  uniqueLogTypes: unknown[];

  courseList = [
    {
      Id: 1,
      icon: 'mdi-account-multiple',
      courseType: 'primary',
      logtype: 'Total',
      log: '12',
      Update: 'Updated 21 Jan 2020',
    },
    {
      Id: 2,
      icon: 'mdi-account-multiple',
      courseType: 'error',
      logtype: 'SYSTEM HALT / REBOOT',
      log: '25',
      Update: 'Updated 25 Jan 2020',
    },
    {
      Id: 3,
      icon: 'file',
      courseType: 'warning',
      logtype: 'BAD LOGIN',
      log: '12',
      Update: 'Updated 30 Jan 2020',
    },
    {
      Id: 4,
      icon: 'file',
      courseType: 'accent',
      logtype: 'OTHER USB DEVICE USAGE',
      log: '25',
      Update: 'Updated 01 Feb 2020',
    },
    {
      Id: 5,
      icon: 'file',
      courseType: 'primary',
      logtype: 'LAST LOGIN LOG',
      log: '25',
      Update: 'Updated 15 Feb 2020',
    },
    {
      Id: 6,
      icon: 'file',
      courseType: 'warning',
      logtype: 'UPGRADE TO SUPER USER',
      log: '16',
      Update: 'Updated 16 Feb 2020',
    },
    {
      Id: 7,
      icon: 'file',
      courseType: 'primary',
      logtype: 'INTEGRITY',
      log: '35',
      Update: 'Updated 18 Feb 2020',
    },
    {
      Id: 8,
      icon: 'file',
      courseType: 'error',
      logtype: 'FILE SYSTEM STATUS',
      log: '123',
      Update: 'Updated 20 Feb 2020',
    },
    {
      Id: 9,
      icon: 'description',
      courseType: 'accent',
      logtype: 'ANDIVIRUS SCAN LOG',
      Time: '80 min',
      log: '234',
      Update: 'Updated 21 Feb 2020',
    },
    {
      Id: 10,
      icon: 'description',
      courseType: 'error',
      logtype: 'BROWSER LOG',
      Time: '150 min',
      log: '253',
      Update: 'Updated 20 Feb 2020',
    },
  ];
  form: any;
  formattedToday: string;
  formattedYesterday: string;

  constructor(
    private fb: FormBuilder,
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
  ){
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.minDate = yesterday;
    this.maxDate = today;

    function formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());
      return `${day}-${month}-${year}`;
    }

    this.formattedToday = formatDate(today); // Format today's date
    this.formattedYesterday = formatDate(yesterday); // Format yesterday's date


    
    this.secondFormGroup = this.fb.group({
      unitname: [],
      clienttype: [],
      logtype: [],
      startDate: [yesterday], // Add validation if needed
      endDate: [today] // Disable end date initially
     
    },   
    );

    
  }

  ngOnInit(): void {
    this.unitNameLocalAdminfun();
    // this.unitTypeLocalAdminfun();
    this.logdetails();

    

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        searchPlaceholder: 'Search here',
      },
      dom: 'lBfrtip',

      initComplete: function () {
        $('.button').removeClass('dt-button');
      },
      buttons: [
        {
          extend: 'copy',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;color: white;font-size: 14px;">
          
            Copy</span>`,
          className: 'bg-primary f-s-12 p-x-12 p-y-6 m-l-8  rounded text-white',
        },
        {
          extend: 'print',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: white;font-size: 14px;">
          
           Print</span>`,
          className: ' bg-primary f-s-12 p-x-12 p-y-6 rounded text-white',
        },
        {
          extend: 'csv',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: white;font-size: 14px;"> 
          
          CSV</span>`,
          className: 'bg-primary f-s-12 p-x-12 p-y-6  rounded text-white',
        },
       
      ],
    };


    // this.formNo = 2;

    // this.logdata = new MatTableDataSource<any>([]);

    // this.logstatus(2, 'view');
  }


formNo: any = 0;

formatDate(date: { getDate: () => { (): any; new(): any; toString: { (): string; new(): any; }; }; getMonth: () => number; getFullYear: () => any; }) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}



toggleAllClients(checked: boolean): void {
  if (checked) {

    console.log("this unit type", this.unitType)
    
  } else {
   
  }
}

logstatus(i: any, logs: any){

  this.formNo = i;

  var unit_ids: any[] = [];
  var client_type: any[] = [];
  var log_types: any[] = [];
  var s_date, e_date;
  var client_type12;

  const formValues = this.secondFormGroup.value;

  if (
    (!formValues.unitname || formValues.unitname === "" || formValues.unitname.length === 0) &&
    (!formValues.clients || formValues.clients === "" || formValues.clients.length === 0) &&
    (!formValues.logtype || formValues.logtype === "" || formValues.logtype.length === 0)
  )
  {
    this.loading = true; 
    
    console.log("form values", formValues)

    console.log('unitName',this.unitName)

    this.unitName.forEach( (obj: any) => unit_ids.push(obj.unit_id) );

    console.log("u_id",unit_ids)

    const params = {
      "unitid": unit_ids,
      "use_subclients": true
    };

    console.log("this.logtype", this.logtypes);

    this.log_value.forEach( (obj: any) => log_types.push(obj.name));

    console.log("log_typea",log_types)

    console.log("s date", this.formattedToday);
    

    this.includeSubClients = true;

    this.common.listofclients(params).subscribe((res1) => {
      console.log(res1);
  
      if (res1.api_status === true) {
        client_type12 = res1.data;
        client_type12.forEach( (obj: any) => client_type.push(obj.client_id)) 
        
        if (formValues.startDate != null){
          s_date= this.formatDate(formValues.startDate);
        }else{
          s_date = this.formattedYesterday;          
        }
      
        if(formValues.endDate != null){
          e_date= this.formatDate(formValues.endDate);
        }else{
          e_date = this.formattedToday;
        }
   
    const param1 = { unit_id: unit_ids, clients: client_type, include_subclient: this.includeSubClients, logtype: log_types, startdate: s_date, enddate: e_date, last_timestamp: null }

    this.common.logfiles(param1).subscribe( (res) => {

      console.log("log respo", res);
  
      if(res.api_status === true)
      {
        this.logdata = res.data;
  
        // this.spinner.hide();
        this.loading = false;
  
      }

      
    }
  
    );

      }
     
    });

    console.log("client type", client_type);

  } else if(formValues.unitname != null && formValues.unitname.length > 0)
  {
    console.log('formValues.unitname else if', formValues.unitname.length )

    this.loading = true; 
    
        console.log("this.logtype", this.logtypes);

    if(formValues.logtype == null )
    {
      this.log_value.forEach( (obj: any) => log_types.push(obj.name));

      console.log("log_typea",log_types)
    }
    else{
      log_types = formValues.logtype;
    }

    this.includeSubClients = true;

    if(formValues.clients != null){

      if (formValues.startDate != null){
        s_date= this.formatDate(formValues.startDate);
      }else{
        s_date = this.formattedYesterday;          
      }
    
      if(formValues.endDate != null){
        e_date= this.formatDate(formValues.endDate);
      }else{
        e_date = this.formattedToday;
      }

      const param1 = { unit_id: formValues.unitname, clients: formValues.clients, include_subclient: this.includeSubClients, logtype: log_types, startdate: s_date, enddate: e_date, last_timestamp: null }
  
      this.common.logfiles(param1).subscribe( (res) => {
  
        console.log("log respo", res);
    
        if(res.api_status === true)
        {
          this.logdata = res.data;
    
          // this.spinner.hide();
          this.loading = false;
    
        }
  
        
      }
    
      );
      

    } else{
      const params = {
        "unitid": formValues.unitname,
        "use_subclients": true
      };

      this.common.listofclients(params).subscribe((res1) => {
        console.log(res1);
    
        if (res1.api_status === true) {
          client_type12 = res1.data;
          client_type12.forEach( (obj: any) => client_type.push(obj.client_id)) 
          
          if (formValues.startDate != null){
            s_date= this.formatDate(formValues.startDate);
          }else{
            s_date = this.formattedYesterday;          
          }
        
          if(formValues.endDate != null){
            e_date= this.formatDate(formValues.endDate);
          }else{
            e_date = this.formattedToday;
          }
     
      const param1 = { unit_id: formValues.unitname, clients: client_type, include_subclient: this.includeSubClients, logtype: log_types, startdate: s_date, enddate: e_date, last_timestamp: null }
  
      this.common.logfiles(param1).subscribe( (res) => {
  
        console.log("log respo", res);
    
        if(res.api_status === true)
        {
          this.logdata = res.data;
    
          // this.spinner.hide();
          this.loading = false;
    
        }
  
        
      }
    
      );
  
        }
       
      });
      
      
    }

    console.log("client type", client_type);

  } else if(formValues.logtype != null && formValues.logtype.length > 0 )
  {
    this.loading = true; 

    if(formValues.unitname != null && formValues.unitname.length > 0 ){
      unit_ids = formValues.unitname;
    }else{
      this.unitName.forEach( (obj: any) => unit_ids.push(obj.unit_id) );
    }


    if(formValues.clients != null){

      if (formValues.startDate != null){
        s_date= this.formatDate(formValues.startDate);
      }else{
        s_date = this.formattedYesterday;          
      }
    
      if(formValues.endDate != null){
        e_date= this.formatDate(formValues.endDate);
      }else{
        e_date = this.formattedToday;
      }

      const param1 = { unit_id: formValues.unitname, clients: formValues.clients, include_subclient: this.includeSubClients, logtype: formValues.logtype , startdate: s_date, enddate: e_date, last_timestamp: null }
  
      this.common.logfiles(param1).subscribe( (res) => {
  
        console.log("log respo", res);
    
        if(res.api_status === true)
        {
          this.logdata = res.data;
    
          // this.spinner.hide();
          this.loading = false;
    
        }
  
        
      }
    
      );
      

    } else{
      const params = {
        "unitid": unit_ids,
        "use_subclients": true
      };
      
  
      this.includeSubClients = true;
  
      this.common.listofclients(params).subscribe((res1) => {
        console.log(res1);
    
        if (res1.api_status === true) {
          client_type12 = res1.data;
          client_type12.forEach( (obj: any) => client_type.push(obj.client_id)) 
          
          if (formValues.startDate != null){
            s_date= this.formatDate(formValues.startDate);
          }else{
            s_date = this.formattedYesterday;          
          }
        
          if(formValues.endDate != null){
            e_date= this.formatDate(formValues.endDate);
          }else{
            e_date = this.formattedToday;
          }
     
      const param1 = { unit_id: unit_ids, clients: client_type, include_subclient: this.includeSubClients, logtype: formValues.logtype, startdate: s_date, enddate: e_date, last_timestamp: null }
  
      this.common.logfiles(param1).subscribe( (res) => {
  
        console.log("log respo", res);
    
        if(res.api_status === true)
        {
          this.logdata = res.data;
    
          // this.spinner.hide();
          this.loading = false;
    
        }
  
        
      }
    
      );
  
        }
       
      });
    }

  }
  
  else {

    console.log(formValues); // Replace this with your search logic

    console.log("unitname",formValues.unitname)
  
  
    if (formValues.startDate != null){
      s_date= this.formatDate(formValues.startDate);
    }
  
    if(formValues.endDate != null){
      e_date= this.formatDate(formValues.endDate);
    }
  
  
    console.log("sub clients", this.includeSubClients)
  
    // console.log("s_date",s_date)

    const params = { unit_id: formValues.unitname, clients: formValues.clienttype, include_subclient: this.includeSubClients, logtype: formValues.logtype , startdate: s_date, enddate: e_date, last_timestamp: null }

    console.log("params", params)
  
    // this.spinner.show();
    this.loading = true;
    console.log("i", i);
    console.log("status", logs)
  
    
  
    this.common.logfiles(params).subscribe( (res) => {
  
      console.log("log respo", res);
  
      if(res.api_status === true)
      {
        this.logdata = res.data;
  
        // this.spinner.hide();
        this.loading = false;
  
      }else{
        this.loading = false;
        // this.errorMessage = res.message; 
        // console.log("this error mesasgae", this.errorMessage)        
        // Swal.fire({
        //   icon: 'error',
        //   title: `${res.message}`,
        // });        
      }
      
    }
  
    );

  }


}

onCheckboxChange(event: any) {
  this.includeSubClients = event.checked;
  console.log('Include Sub Clients:', this.includeSubClients);

  const params = {
    "unitid": this.unit_id,
    "use_subclients": this.includeSubClients
  };

  this.common.listofclients(params).subscribe((res1) => {
    console.log(res1);

    if (res1.api_status === true) {
      // this.unitType = []; // Clear the unitType array before assigning new values

      // const unit_data = res1.data;
      // unit_data.forEach((client: any) => {
      //   this.unitType.push({ name: client.client_name }); // Push each client name into unitType
      // });
      this.unitType = res1.data;
    }

    console.log("client type", this.unitType);
  });


}

 
tabChanged(event: any) {
  console.log("event", event);
 }

unitNameLocalAdminfun() {
  this.spinner.show();
  this.common.unitNameLocalAdmin().subscribe((res: any) => {
    if (res.api_status === true) {
      this.spinner.hide();
      this.unitName = res.data;
    } else {
      this.spinner.hide();
      // Swal.fire({
      //   icon: 'error',
      //   title: `${res.message}`,
      // });
    }
  }, error => {
    this.spinner.hide();
    console.log("Error: ", error);
  });
}

logdetails(){
  var log_de = [];
  var log_info;

  this.common.loginfo().subscribe( (res12) => {
    if(res12.api_status == true)
    {
      console.log("res logs", res12.data);
      const logTypes = Object.keys(res12.data).map((key) => ({
        name: key,
        value: res12.data[key]
      }));

      const logType12 = Object.values(res12.data).map(value => ({ name: value }));
      
      console.log("res log value", logTypes)

      this.logtypes = Object.entries(res12.data).map(([key, value]) => ({ name: key, value: value as string }));
      this.log_value = logType12;
      console.log('this.log', this.logtypes);

    }
  }

  );
}

onLogTypeSelection(selectedKeys: any) {
  console.log("keys", selectedKeys);
 
}

onUnitSelected(selectedUnitId: any) {
  console.log('Selected unit ID:', selectedUnitId);
  this.unit_id = selectedUnitId;
  
  if(this.use_subclients == false)
  {
    console.log("if",this.use_subclients);
    this.use_subclients = false;
  } else if (this.use_subclients == false) {
    console.log("else",this.use_subclients);
    this.use_subclients = true;
  }else{
    this.use_subclients = false;
  }
  // this.use_subclients = false;

  const params = {
    "unitid": selectedUnitId,
    "use_subclients": this.use_subclients
  };

  this.common.listofclients(params).subscribe((res1) => {
    console.log(res1);

    if (res1.api_status === true) {
      this.unitType = res1.data;
    }

    console.log("client type", this.unitType);
    this.checkboxEnabled = selectedUnitId !== null && selectedUnitId !== '';
  });
}

onClientSelected(selectedClientId: any) {
  console.log("client ID", selectedClientId)

}

handleDateRangeChange(event: any) {
  const selectedDate = event.value;
  // Perform operations with the selected date range
  console.log('Selected date range:', selectedDate);
}

resetForm() {

   this.secondFormGroup.reset();

}


performSearch() {

  const formValues = this.secondFormGroup.value;

  console.log(formValues); // Replace this with your search logic

  // this.secondFormGroup.reset();
  // this.use_subclients = false;

  this.secondFormGroup.reset({
    unitname: null, // Reset the specific form controls
    startDate: null,
    endDate: null,
    // Add other form controls here with their initial values
});

this.use_subclients = false;

  Object.keys(this.secondFormGroup.controls).forEach(controlName => {
    const control = this.secondFormGroup.get(controlName);
    if (control) {
      control.setErrors(null);
    }
  });

}

}
