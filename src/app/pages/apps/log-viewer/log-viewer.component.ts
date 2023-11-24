import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent {

  secondFormGroup: FormGroup;
  unitName: any;
  unitType: any;
  logtypes: any;
  minDate: Date | null = null;

  selectedTabIndex = 0; // Default to Log Search tab
  showInner = false;
  maxDate: Date;

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
      startDate: [yesterday], // Add validation if needed
      endDate: [today ] // Disable end date initially
     
    },   
    );

    
  }

  ngOnInit(): void {
    this.unitNameLocalAdminfun();
    this.unitTypeLocalAdminfun();
    this.logdetails();
  }

  setMinEndDate(event: any): void {
    this.minDate = event.value;
    console.log(this.minDate);
    this.secondFormGroup.get('endDate')?.enable();
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

  unitTypeLocalAdminfun() {
    this.spinner.show();
    this.common.unitTypeLocalAdmin().subscribe((res: any) => {
      if (res.api_status === true) {
        this.spinner.hide();
        this.unitType = res.data;
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
        // this.logdetails = res12.data;

      }
    }

    );
  }




  performSearch() {

    const formValues = this.secondFormGroup.value;

    console.log(formValues); // Replace this with your search logic


  }

}
