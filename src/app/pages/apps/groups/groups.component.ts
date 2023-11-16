import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {

  loaderStatus: string = 'Loading...';


  createGroup = this._formBuilder.group({
    groupName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{0,10}$/)]],
    groupDesc: ['', [Validators.required, Validators.pattern(/^[\s\S]{0,200}$/)]],
  });

  
  constructor(private _formBuilder: FormBuilder, private common: CommonServicesService, private spinner: NgxSpinnerService) {
    
  }



  tabChanged(event: any) {
    console.log("tab changed", event);
    if (event === 0) {
      console.log(" create group");
    }
    if (event === 1) {
      console.log("manage group call");
    }
    if (event === 2) {
      console.log("client mapped to existing froup");
    }
  }

  submit(){
    console.log("form data..",this.createGroup.value);
  }
}
