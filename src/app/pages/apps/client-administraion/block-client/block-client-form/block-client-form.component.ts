import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-block-client-form',
  templateUrl: './block-client-form.component.html',
  styleUrls: ['./block-client-form.component.scss']
})
export class BlockClientFormComponent {

  clientInfo: any;


  loaderStatus: string = 'Loading...';


  deleteClient = this._formBuilder.group({
    remark: ['', [Validators.required, Validators.pattern(/^[\s\S]{0,200}$/)]],
  });

  @Output() reloadParent: EventEmitter<any> = new EventEmitter();


  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BlockClientFormComponent>
  ) {

    
  }


  ngOnInit(): void {
    

    const clientInfoString = localStorage.getItem("dclient");

    if (clientInfoString) {
      // Parse the retrieved string as JSON to get an object
      this.clientInfo = JSON.parse(clientInfoString);
  
      console.log("deleteClientInfo2", this.clientInfo);
  
      // Now, access the client_id property
      console.log("deleteClientInfo  02", this.clientInfo.client_id);
    } else {
      console.log("No 'dclient' data found in localStorage.");
    }

    
  }
params: any

  submit(){
    console.log("form data..",this.deleteClient.value);
    
    Swal.fire({
      title: 'Do you really want to block the client?',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Block Client',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        // this.deleteUnitApi();
       this.params = {client_id: this.clientInfo.client_id, remark:this.deleteClient.value.remark}
        
        console.log("param", this.params);
        this.blockClientAPI(this.params)
        
        // this.closeDialog()
        
      } else if (result.isDenied) {
        Swal.fire('Blocking Client Cancelled', '', 'info');
      }
    });

  }

  closeDialog() {
    this.dialogRef.close();
    this.reloadParent.emit();
  }

  blockClientAPI(params: any) {
    this.spinner.show();
    // this.unitType = '';
    this.common.blockClient(params).subscribe((res: any) => {
      if (res.api_status === true) {

        this.closeDialog()

        this.spinner.hide();

        Swal.fire({
          icon: 'success',
          title: `${res.message}`,
        });
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
