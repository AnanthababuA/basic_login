import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent {
  clientInfo: any;

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
  ) {

    const clientIdData = localStorage.getItem('clientId');
  if (clientIdData) {
    const parsedData = JSON.parse(clientIdData);
    console.log('Data retrieved from localStorage:', parsedData.data);
    this.clientInfo = parsedData.data[0]

    console.log("data is..", this.clientInfo.client_id);
    
  } else {
    console.log('No data found in localStorage with key clientId');
  }
  }
  
  ngOnInit() {


  }
 

}
