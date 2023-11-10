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
  ],
  templateUrl: './dashboard1.component.html',
})
export class AppDashboard1Component {
  constructor() {}

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
