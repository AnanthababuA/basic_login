
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usbdeleteform',
  templateUrl: './usbdeleteform.component.html',
  styleUrls: ['./usbdeleteform.component.scss']
})
export class UsbdeleteformComponent {

  usbvaluedel: any;
  deleteusbviolation = this._formBuilder.group({
    remark: ['', [Validators.required, Validators.pattern(/^[\s\S]{0,200}$/)]],
  });

  @Output() reloadParent: EventEmitter<any> = new EventEmitter();
  params: any;

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsbdeleteformComponent>
  ) {

    
  }

  ngOnInit() {

    this.usbvalue();
    

  }

  submit() {
    console.log("submit ")
    const formvalues = this.deleteusbviolation.value;

    console.log("formvalues", formvalues);

    console.log("this.us", this.usbvaluedel );

    Swal.fire({
      title: 'Do you really want to delete the client',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        // this.deleteUnitApi();
       this.params = {value: this.usbvaluedel.value, name: this.usbvaluedel.name, remarks: this.deleteusbviolation.value.remark}
        
        console.log("param", this.params);
        this.DeleteusbAPI(this.params)
        
        console.log("deleted the file");
        // this.closeDialog()
        
      } else if (result.isDenied) {
        Swal.fire('Deleting Client Cancelled', '', 'info');
      }
    });
  }

  usbvalue() {
    this.usbvaluedel = this.common.getusbviolationvalue();

    console.log("usb delete", this.usbvaluedel.value, this.usbvaluedel.name);
  }

  closeDialog() {
    this.dialogRef.close();
    this.reloadParent.emit();
  }

  DeleteusbAPI(params: any) {
    this.spinner.show();
    // this.unitType = '';
    this.common.usbdelete(params).subscribe((res: any) => {
      if (res.api_status === true) {

        this.closeDialog()

        this.spinner.hide();
        // this.unitType = res.data;
      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        });
      }
    }, error => {
      this.spinner.hide();
      this.closeDialog()

      console.log("Error: ", error);
    });
  }


}