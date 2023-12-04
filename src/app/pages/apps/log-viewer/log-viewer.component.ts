import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent {
  @ViewChild('picker') picker: MatDateRangePicker<Date>;



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
  logtypes: any;
  minDate: Date | null = null;
  includeSubClients = false;

  selectedTabIndex = 0; // Default to Log Search tab
  showInner = false;
  maxDate: Date;
  dateRange: FormGroup;
  checkboxEnabled = false;

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
    
    this.secondFormGroup = this.fb.group({
      unitname: [],
      clienttype: [],
      logtype: [],
      startDate: [], // Add validation if needed
      endDate: [ ] // Disable end date initially
     
    },   
    );

    
  }

  ngOnInit(): void {
    this.unitNameLocalAdminfun();
    // this.unitTypeLocalAdminfun();
    this.logdetails();
  }


formNo: any = 0

logstatus(i: any, logs: any){
  console.log("i", i);
  console.log("status", logs)

  this.formNo = i;

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
      Swal.fire({
        icon: 'error',
        title: `${res.message}`,
      });
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
      console.log("res", res12.data);
      const logTypes = Object.keys(res12.data).map(key => ({ name: key }));

      this.logtypes = logTypes;
      console.log('this.log', this.logtypes);

    }
  }

  );
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
