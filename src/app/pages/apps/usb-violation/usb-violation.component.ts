import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
// import { UsbdeleteformComponent } from './usbdeleteform/usbdeleteform.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usb-violation',
  templateUrl: './usb-violation.component.html',
  styleUrls: ['./usb-violation.component.scss']
})
export class UsbViolationComponent {

  dtOptions : any;
  usbdata: any;
  secondFormGroup: FormGroup;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private common: CommonServicesService,
    private spinner: NgxSpinnerService, public dialog: MatDialog
  ){
    this.secondFormGroup = this.fb.group({
      usbviolationtype: []
    },   
    );
  }

  ngOnInit() {



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
    
    
    this.usbviolationlist();
  }

  usbviolationlist(){
    this.loading = true;
    this.common.usblist().subscribe( (res) => {
      console.log("USB Response", res);
      if(res.api_status === true)
      {
        this.usbdata = res.data;
        this.loading = false;
      }
    } );
  }

  addusbviolation() {
    const usbviolationtype = this.secondFormGroup.value;

    console.log("adding usb violation function");

    console.log("vsb type", usbviolationtype);

    this.common.usbcreate({value: usbviolationtype.usbviolationtype}).subscribe( (res) => {
      console.log("res useb", res)
      if(res.api_status === true){
        Swal.fire('New usb violation value updated', '', 'success');   
        this.usbviolationlist();
      }
    }    );

    this.secondFormGroup.reset();

      Object.keys(this.secondFormGroup.controls).forEach(controlName => {
    const control = this.secondFormGroup.get(controlName);
    if (control) {
      control.setErrors(null);
    }
  });

  }


  deleteRow(row: any) {
    console.log('row', row);

    // localStorage.setItem()

    this.common.storeusbviolationvalue(row);
    
    // this.openDialog()

  }

  reloadParentComponent() {
    // Your logic to reload the parent component
    console.log('Reloading parent component...');

    this.ngOnInit()
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(UsbdeleteformComponent, {
     
  //   });

  //   dialogRef.componentInstance.reloadParent.subscribe(() => {
  //     this.reloadParentComponent(); // Call the function to reload the parent component
  //   });

  
  // }


}