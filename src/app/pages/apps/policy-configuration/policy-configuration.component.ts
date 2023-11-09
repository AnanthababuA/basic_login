import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';



// table 1
export interface productsData {
  id: number;
  imagePath: string;
  upolicyType: string;
  position: string;
  productName: string;
  activePolicy: number;
  totalPolicy: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    upolicyType: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    activePolicy: 3.9,
    totalPolicy: 'low'
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    upolicyType: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    activePolicy: 24.5,
    totalPolicy: 'medium'
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    upolicyType: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    activePolicy: 12.8,
    totalPolicy: 'high'
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    upolicyType: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    activePolicy: 2.4,
    totalPolicy: 'critical'
  },
];


@Component({
  selector: 'app-policy-configuration',
  templateUrl: './policy-configuration.component.html',
  styleUrls: ['./policy-configuration.component.scss']
})


export class PolicyConfigurationComponent {


  policySummary: any

  constructor(private _formBuilder: FormBuilder, private common: CommonServicesService, private spinner: NgxSpinnerService) { }

  dataSource1:any


  ngOnInit(): void {

    this.spinner.show();

    this.common.policySummary().subscribe((res: any) => {

      this.spinner.hide();

      if (res.api_status === true) {

        this.policySummary = res.data

  // dataSource1 = PRODUCT_DATA;

        console.log("policy summary", this.policySummary);

        console.log("policy summary-ip", this.policySummary.IP);

        console.log("policy summary-ip-total", this.policySummary.IP.total);
        
        this.dataSource1 = PRODUCT_DATA;



      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })
  }

  // table 1
  displayedColumns1: string[] = [ 'policyType', 'totalPolicy', 'activePolicy'];
  // dataSource1 = PRODUCT_DATA;

  
}
