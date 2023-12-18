import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

// map
// import { DxVectorMapModule, DxPieChartModule } from 'devextreme-angular';

import { DashboardsRoutes } from './dashboards.routing';
// import { AlertContentComponent } from './dashboard1/alert-content/alert-content.component';
// import { LastCommuniAlertpopComponent } from './dashboard1/last-communi-alertpop/last-communi-alertpop.component';

@NgModule({
  imports: [RouterModule.forChild(DashboardsRoutes)],
  providers: [DatePipe],
  declarations: [
   
  
  
    // LastCommuniAlertpopComponent
  
    // AlertContentComponent
  ],
})
export class DashboardsModule {}
