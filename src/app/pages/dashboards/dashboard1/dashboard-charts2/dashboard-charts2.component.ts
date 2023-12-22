import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  NgApexchartsModule,
  
  ApexAxisChartSeries,
  ApexYAxis,
  ApexXAxis,
  ApexTheme,
  ApexGrid,
  ApexFill,
} from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material.module';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { PatchPopUpComponent } from '../patch-pop-up/patch-pop-up.component';
import { PolicyPopUpComponent } from '../policy-pop-up/policy-pop-up.component';
import { ClamAvPopUpComponent } from '../clam-av-pop-up/clam-av-pop-up.component';
import { LogPopUpComponent } from '../log-pop-up/log-pop-up.component';
import { SpinnerComponent } from '../spinner/spinner.component';

export interface piechart {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any | any;
  tooltip: ApexTooltip | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  stroke: any | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
}


@Component({
  selector: 'app-dashboard-charts2',
  templateUrl: './dashboard-charts2.component.html',
  styleUrls: ['./dashboard-charts2.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, SpinnerComponent],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardCharts2Component {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public pie1Chart: Partial<piechart> = {};
  public pie2Chart: Partial<piechart> = {};
  public pie3Chart: Partial<piechart> = {};
  public pie4Chart: Partial<piechart> = {};
  // public pie4Chart: Partial<piechart> = {}; 


  updatedClient : any
  remainingClient : any
  
  policy_ver: any;
  patch_ver: any;

  pol_tot_cli: number;
  pol_upd_cli: number ;
  pat_tol_cli:  number;
  pat_upd_cli: any;

  pol_per_val: any;
  pat_per_val: any;

  clamUpdatedCount: any;
  clamTotal:any
  clamAvPercentage:any

  logRecievedCount: any;
  logrecivedTotal: any
  logRecivedPercentage: any

  alert_count: any;

  clamAvData: any;
  logRecievedData: any;

  componentName : any

  isSpinnerVisible: { [key: string]: boolean } = {};

  constructor(  private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog) {

      // this.currentyearChart = {
      //   series: [55, 55, 55],
      //   chart: {
      //     type: 'donut',
      //     fontFamily: "'Plus Jakarta Sans', sans-serif;",
  
      //     toolbar: {
      //       show: false,
      //     },
      //     height: 220,
      //   },
      //   labels: ['Income', 'Current', 'Expance'],
      //   colors: ['#5D87FF', '#ECF2FF', '#49BEFF'],
      //   plotOptions: {
      //     pie: {
      //       startAngle: 0,
      //       endAngle: 360,
      //       donut: {
      //         size: '89%',
      //         background: 'transparent',
  
      //         labels: {
      //           show: true,
      //           name: {
      //             show: true,
      //             offsetY: 7,
      //           },
      //           value: {
      //             show: false,
      //           },
      //           total: {
      //             show: true,
      //             color: '#2A3547',
      //             fontSize: '20px',
      //             fontWeight: '600',
      //             label: '$98,260',
      //           },
      //         },
      //       },
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   stroke: {
      //     show: false,
      //   },
      //   legend: {
      //     show: false,
      //   },
      //   tooltip: {
      //     theme: 'dark',
      //     x: {
      //       show: false,
      //     },
      //   },
      // };

    // 1
   

    // 2
   

    // 3
    

    // 4
   
    
  }

  // ngOnInit(): void {

  

  //   this.common.policyver().subscribe((res) => {
  //     // console.log('res1', res);
  //     if (res.api_status === true) {
  //       this.policy_ver = res.latest_policy_version;
  //       this.pol_tot_cli = res.total_clients;
  //       this.pol_upd_cli = res.updated_clients;
  //       this.pol_per_val = res.policy_percentage;
  //       this.piechart1()
  //     }
  //   });

  //   this.common.patchver().subscribe((res) => {
  //     // console.log('res2', res);
  //     if (res.api_status === true) {
  //       this.patch_ver = res.latest_patch_version;
  //       this.pat_tol_cli = res.total_clients;
  //       this.pat_upd_cli = res.updated_clients;
  //       this.pat_per_val = res.patch_percentage;
  //     }
  //   });

  //   this.clamAvAPI();
  //   this.logReceivedAPI();
    
    
    
  // }

  ngOnInit(): void {

    this.isSpinnerVisible['dashPolicyCard'] = true;
    this.isSpinnerVisible['dashPatchCard'] = true;


    forkJoin([
      this.common.policyver(),
      this.common.patchver(),
      // this.common.clamAvUpdatedDashboard(),
      // this.common.logReceivedDashboard()
    ]).subscribe(([policyVerRes, patchVerRes]) => {
      if (policyVerRes.api_status === true) {
    this.isSpinnerVisible['dashPolicyCard'] = false;

        this.policy_ver = policyVerRes.latest_policy_version;
        this.pol_tot_cli = policyVerRes.total_clients;
        this.pol_upd_cli = policyVerRes.updated_clients;
        this.pol_per_val = Math.floor(policyVerRes.policy_percentage) + "%"

        console.log( "per..", this.pol_per_val);
        
        this.piechart2();
      }else{
    this.isSpinnerVisible['dashPolicyCard'] = false;

      }
      if (patchVerRes.api_status === true) {
    this.isSpinnerVisible['dashPatchCard'] = false;

        this.patch_ver = patchVerRes.latest_patch_version;
        this.pat_tol_cli = patchVerRes.total_clients;
        this.pat_upd_cli = patchVerRes.updated_clients;
        this.pat_per_val = Math.floor(patchVerRes.patch_percentage) + "%"

      }else{
    this.isSpinnerVisible['dashPatchCard'] = false;

      }
      this.piechart1(); // Create the pie chart after getting data
    });

    this.clamAvAPI()

    this.logReceivedAPI()

  }



  piechart1(){
    console.log("5555", this.pat_upd_cli
    , this.pat_tol_cli);
    
    
    this.pie1Chart = {
      series: [  this.pat_upd_cli
        , this.pat_tol_cli - this.pat_upd_cli],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
        
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
            background: 'transparent',

            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 7,
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                color: '#2A3547',
                fontSize: '14px',
                fontWeight: '400',
                label: `${this.pat_per_val}`,
              },
            },
          },
          expandOnClick: false ,
          toggleDataPointSelection: false,
          
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
        formatter: function (val: any, opts: any) {
          return '55'; // Replace with your desired value or logic
        },
      },
      labels: ['Patch Updated', 'Patch Remaining'],
      colors: ['#1e88e5', 'rgba(0, 0, 0, 0.1)'],
      
      
      
    };
   
  }

  piechart2(){
    this.pie2Chart = {
      series: [this.pol_upd_cli, this.pol_tot_cli - this.pol_upd_cli],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
            background: 'transparent',

            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 7,
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                color: '#2A3547',
                fontSize: '14px',
                fontWeight: '400',
                label: `${this.pol_per_val}`,
              },
            },
          },
          expandOnClick: false ,
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Policy Updated', 'Policy Remaining'],
      colors: ['#26c6da', 'rgba(0, 0, 0, 0.1)'],
    };
  }

  piechart3(){
    this.pie3Chart = {
      series: [this.clamUpdatedCount , this.clamTotal - this.clamUpdatedCount],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
            background: 'transparent',

            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 7,
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                color: '#2A3547',
                fontSize: '14px',
                fontWeight: '400',
                label: `${this.clamAvPercentage}`,
              },
            },
          },
          expandOnClick: false ,
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['ClamAV Updated', 'ClamAV Remaining'],
      colors: ['#ffb22b', 'rgba(0, 0, 0, 0.1)'],
    };
  }

  piechart4(){
    this.pie4Chart = {
      series: [this.logRecievedCount, this.logrecivedTotal - this.logRecievedCount],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 100,
        offsetY: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85px',
            background: 'transparent',

            labels: {
              show: true,
              name: {
                // show: true,
                offsetY: 7,
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                color: '#2A3547',
                fontSize: '14px',
                fontWeight: '400',
                label: `${this.logRecivedPercentage}`,
              },
            },
          },
          expandOnClick: false ,
        },
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      tooltip: {
        fillSeriesColor: false,
        
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Log Recieved', 'Log Remaining'],
      colors: ['#fc4b6c', 'rgba(0, 0, 0, 0.1)'],
    };
  }
  

  clamAvAPI() {
    this.isSpinnerVisible['dashClamAVCard'] = true;

    this.spinner.show();
    this.clamAvData = '';
    this.common.clamAvUpdatedDashboard().subscribe(
      (res: any) => {
    this.isSpinnerVisible['dashClamAVCard'] = false;

        if (res.api_status === true) {
          this.spinner.hide();
          this.clamAvData = res;
          this.clamUpdatedCount = res.clam_updated_count
          this.clamTotal  = res.total_reg 
          this.clamAvPercentage = Math.floor(res.clam_updated_percent)+ "%"
          this.piechart3()
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
    this.isSpinnerVisible['dashClamAVCard'] = false;

        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

  logReceivedAPI() {

    this.isSpinnerVisible['dashAlertCard'] = true;

    this.spinner.show();
    this.logRecievedData = '';
    this.common.logReceivedDashboard().subscribe(
      (res: any) => {
    this.isSpinnerVisible['dashAlertCard'] = false;

        if (res.api_status === true) {
          this.spinner.hide();
          this.logRecievedData = res;

          this.logRecievedCount = res.log_received_count;
          this.logrecivedTotal = res.total_reg;
          this.logRecivedPercentage = Math.floor(res.log_received_percent)+ "%"
          console.log("log per",this.logRecivedPercentage);
          
          this.piechart4()
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
    this.isSpinnerVisible['dashAlertCard'] = false;

        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

   openDialogPolicy(componentName : any) {
    const dialogRef = this.dialog.open(componentName);

    dialogRef.afterClosed().subscribe((result) => {
    });
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

}
