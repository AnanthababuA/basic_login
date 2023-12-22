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
  AppTopCardsComponent,
  
} from 'src/app/components';

import { NgForOf } from '@angular/common';
// import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PolicyPopUpComponent } from './policy-pop-up/policy-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PatchPopUpComponent } from './patch-pop-up/patch-pop-up.component';
import { ClamAvPopUpComponent } from './clam-av-pop-up/clam-av-pop-up.component';
import { LogPopUpComponent } from './log-pop-up/log-pop-up.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { LastCommuniAlertpopComponent } from './last-communi-alertpop/last-communi-alertpop.component';
import { AlertContentComponent } from './alert-content/alert-content.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegesteredClientPopUpComponent } from './regestered-client-pop-up/regestered-client-pop-up.component';
import { DeletedClientPopUpComponent } from './deleted-client-pop-up/deleted-client-pop-up.component';
import { BlockedClientPopUpComponent } from './blocked-client-pop-up/blocked-client-pop-up.component';
import { DashboardCharts2Component } from './dashboard-charts2/dashboard-charts2.component';
// import { AppSalesOurVisitorsComponent as AppSalesOurVisitorsComponent } from "../../../components/dashboard1/our-visitors/our-visitors.component";



@Component({
    selector: 'app-dashboard1',
    standalone: true,
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss'],
    imports: [
        MatIconModule,
        MatNativeDateModule,
        CommonModule,
        MatCardModule,
        AppSalesOurVisitorsComponent,
        PatchPopUpComponent,
        PolicyPopUpComponent,
        ClamAvPopUpComponent,
        LogPopUpComponent,
        DashboardChartsComponent,
        DashboardCharts2Component,
        // LastCommuniAlertpopComponent,
        SpinnerComponent
    ]
})
export class AppDashboard1Component {


  reg_count: any;
  policy_ver: any;
  patch_ver: any;

  pol_tot_cli: any;
  pol_upd_cli: any;
  pat_tol_cli: any;
  pat_upd_cli: any;

  pol_per_val: any;
  pat_per_val: any;

  alert_count: any;

  clamAvData: any;
  logRecievedData: any;

  deletedClientCount: any;
  blockedClientdCount: any;

  componentName : any

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isSpinnerVisible['Registrationcard'] = true;
    this.common.clientreg().subscribe((res) => {
      // console.log('res', res);
      this.isSpinnerVisible['Registrationcard'] = false;
      if (res.api_status === true) {
        this.reg_count = res.reg_count;
      }
    });

    // this.common.policyver().subscribe((res) => {
    //   // console.log('res1', res);
    //   if (res.api_status === true) {
    //     this.policy_ver = res.latest_policy_version;
    //     this.pol_tot_cli = res.total_clients;
    //     this.pol_upd_cli = res.updated_clients;
    //     this.pol_per_val = res.policy_percentage;
    //   }
    // });

    // this.common.patchver().subscribe((res) => {
    //   // console.log('res2', res);
    //   if (res.api_status === true) {
    //     this.patch_ver = res.latest_patch_version;
    //     this.pat_tol_cli = res.total_clients;
    //     this.pat_upd_cli = res.updated_clients;
    //     this.pat_per_val = res.patch_percentage;
    //   }
    // });

    // this.clamAvAPI();
    // this.logReceivedAPI();

    this.alertAPI();

    this.blockedClientAPI()
    this.deletedClientAPI()
    
  }

  alertAPI(){
    this.isSpinnerVisible['dashAlertCard'] = true;

    this.common.alertinfo().subscribe( (res) => {
    this.isSpinnerVisible['dashAlertCard'] = false;

      console.log('res alert', res)

      if(res.api_status == true)
      {
        this.alert_count = res.total_count;
      }
    }

    );
  }


  // clamAvAPI() {
  //   this.spinner.show();
  //   this.clamAvData = '';
  //   this.common.clamAvUpdatedDashboard().subscribe(
  //     (res: any) => {
  //       if (res.api_status === true) {
  //         this.spinner.hide();
  //         this.clamAvData = res;
  //       } else {
  //         this.spinner.hide();

  //         Swal.fire({
  //           icon: 'error',
  //           title: `${res.message}`,
  //         });
  //       }
  //     },
  //     (error) => {
  //       this.spinner.hide();

  //       this.common.apiErrorHandler(error);
  //       // console.log('eerror---', error);
  //     }
  //   );
  // }

  // logReceivedAPI() {
  //   this.spinner.show();
  //   this.logRecievedData = '';
  //   this.common.logReceivedDashboard().subscribe(
  //     (res: any) => {
  //       if (res.api_status === true) {
  //         this.spinner.hide();
  //         this.logRecievedData = res;
  //       } else {
  //         this.spinner.hide();

  //         Swal.fire({
  //           icon: 'error',
  //           title: `${res.message}`,
  //         });
  //       }
  //     },
  //     (error) => {
  //       this.spinner.hide();

  //       this.common.apiErrorHandler(error);
  //       // console.log('eerror---', error);
  //     }
  //   );
  // }

  deletedClientAPI() {
    this.isSpinnerVisible['dashDeleteClientCard'] = true;

    this.spinner.show();
    this.deletedClientCount = '';
    this.common.dashboardDeletedClients().subscribe(
      (res: any) => {
    this.isSpinnerVisible['dashDeleteClientCard'] = false;

        if (res.api_status === true) {
          this.spinner.hide();
          this.deletedClientCount = res.data;
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

  blockedClientAPI() {
    this.isSpinnerVisible['dashBlockClientCard'] = true;

    this.spinner.show();
    this.blockedClientdCount = '';
    this.common.dashboardBlockClients().subscribe(
      (res: any) => {
    this.isSpinnerVisible['dashBlockClientCard'] = false;

        if (res.api_status === true) {
          this.spinner.hide();
          this.blockedClientdCount = res.data;
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

 
  regClientCard() {

    this.componentName = RegesteredClientPopUpComponent
    this.openDialogPolicy(this.componentName)
    // this.router.navigate(['/apps/clientAdministration']);
    
    // this.common.triggerClientStatusFunction(1);
    // console.log('regClientCard function called');

  }
  
  patchCard() {
    console.log('patchCard function called');
    this.componentName = PatchPopUpComponent
    this.openDialogPolicy(this.componentName)
    
  }
  
  policyCard() {
    console.log('policyCard function called');
    this.componentName = PolicyPopUpComponent
    this.openDialogPolicy(this.componentName)
  }
  
  clamAvCard() {
    console.log('clamAvCard function called');
    this.componentName = ClamAvPopUpComponent
    this.openDialogPolicy(this.componentName)
    
  }
  
  logCard() {
    console.log('logCard function called');
    this.componentName = LogPopUpComponent
    this.openDialogPolicy(this.componentName)
    
  } 

  alertCard(){
    console.log("alert card function called")
    this.componentName = AlertContentComponent;
    this.openDialogPolicy(this.componentName)
  }

lastcommun()
{
  console.log("last communication alert function")
  this.componentName = LastCommuniAlertpopComponent;
  this.openDialogPolicy(this.componentName)
}

bolckClientCard(){
  console.log("alert card function called")
  this.componentName = BlockedClientPopUpComponent;
  this.openDialogPolicy(this.componentName)
}

deleteClientCard(){
  console.log("alert card function called")
  this.componentName = DeletedClientPopUpComponent;
  this.openDialogPolicy(this.componentName)
}
  

  //  i = PolicyPopUpComponent
  openDialogPolicy(componentName : any) {
    const dialogRef = this.dialog.open(componentName);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  isSpinnerVisible: { [key: string]: boolean } = {};

  sampleShow(){
    this.isSpinnerVisible['card1'] = true;
  }

  sampleHide(){
    this.isSpinnerVisible['card1'] = false;
  }

}
