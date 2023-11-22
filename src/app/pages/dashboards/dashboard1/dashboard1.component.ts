import { Component } from '@angular/core';
import {
  AppActivityTimelineComponent,
  AppBandwidthUsageComponent,
  AppBlogCardComponent,
  AppDownloadCountComponent,
  // AppMyContactsComponent,
  AppNewsletterCampaignComponent,
  AppProfileCardComponent,
  AppSalesOurVisitorsComponent,
  AppSalesOverviewComponent,
  AppWeatherCardComponent,
  AppTopCardsComponent
} from 'src/app/components';

import { NgForOf } from '@angular/common';
// import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CommonServicesService } from 'src/app/services/common-services.service';


interface topcards {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    AppTopCardsComponent,
    AppSalesOverviewComponent,
    AppSalesOurVisitorsComponent,
    AppBlogCardComponent,
    AppNewsletterCampaignComponent,
    AppBandwidthUsageComponent,
    AppDownloadCountComponent,
    AppWeatherCardComponent,
    AppProfileCardComponent,
    // AppMyContactsComponent,
    AppActivityTimelineComponent,
    MatIconModule, MatNativeDateModule, CommonModule, MatCardModule
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component {


  reg_count: any;
  policy_ver: any;
  patch_ver: any;


  constructor(private cs: CommonServicesService) {}

  ngOnInit(): void {
    // this.onLoad();


    this.cs.clientreg().subscribe( (res) => {
      console.log("res", res);
      if(res.api_status === true)
      {
        this.reg_count = res.reg_count;
      }
    }

    );

    this.cs.policyver().subscribe( (res) => {
      console.log("res1", res)
      if(res.api_status === true){
        this.policy_ver = res.latest_policy_version;
      }
    }

    );

    this.cs.patchver().subscribe( (res) => {
      console.log("res2", res)
      if(res.api_status === true){
        this.patch_ver = res.latest_patch_version;
      }
    }

    );

  
  }


  topcards: topcards[] = [
    {
      id: 1,
      color: 'primary',
      icon: 'account_circle',
      title: '386',
      subtitle: 'New Clients',
    },
    {
      id: 2,
      color: 'warning',
      icon: 'local_mall',
      title: '2,408',
      subtitle: 'All Projects',
    },
    {
      id: 3,
      color: 'accent',
      icon: 'stars',
      title: '352',
      subtitle: 'New Items',
    },
    {
      id: 4,
      color: 'error',
      icon: 'content_paste',
      title: '159',
      subtitle: 'New Invoices',
    },
  ];
  
}
