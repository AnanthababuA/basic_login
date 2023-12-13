import { DatePipe } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
} from 'ng-apexcharts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material.module';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';


export type ChartOptions = {
  series: ApexNonAxisChartSeries | undefined;
  chart: ApexChart | undefined;
  dataLabels: ApexDataLabels | undefined;
  plotOptions: ApexPlotOptions | undefined;
  legend: ApexLegend | undefined;
  colors: string[] | undefined;
  labels: string[] | undefined;
};

export interface ourvisitorChart {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  tooltip: ApexTooltip | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  stroke: any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
}

@Component({
  selector: 'app-our-visitors',
  templateUrl: './our-visitors.component.html',
  styleUrls: ['./our-visitors.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, ReactiveFormsModule,NgxSpinnerModule,],
  encapsulation: ViewEncapsulation.None,

})
export class AppSalesOurVisitorsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public ourvisitorChart!: Partial<ourvisitorChart> | any;
  chartOptions : any
  chartOptions2 : any
  dateRangeForm: FormGroup;

  otpStatus: any
  otpStatusPercentage: number =0;
  registationStatus: any;


  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private common: CommonServicesService,
    private spinner: NgxSpinnerService) {
    

    this.ourvisitorChart = {
      series: [45, 15, 27, 18],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 253,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85%',
            background: 'transparent',
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["ClamAv", "SSH", "Integrity", "URL Violation"],
      
      
      colors: ['#1e88e5','#ffb22b', '#7456f0', '#26c6da'],

      responsive: [{ breakpoint: 480, options: { chart: { height: 230 } } }],
      style: {
        fontSize: '18px', // Setting font size to 18px
        fontFamily: 'Poppins, sans-serif', // Font family if needed
      },
    };

    this.chartOptions = {
      series: [44, 55, 13, 43],
      chart: {
        height: 253,
        // width: 380,
        type: "pie"
      },
      labels: ["ClamAv", "SSH", "Integrity", "URL Violation"],
      colors: ['#1e88e5','#ffb22b', '#abed5b', '#26c6da'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // width: 200
              height: 230
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.otpStatusChart(this.otpStatusPercentage)

    
  }

  ngOnInit() {
    this.dateRangeForm = this.formBuilder.group({
      startDate: [''], // Initialize with default values if needed
      endDate: [''],     // Initialize with default values if needed
    });

    // Initialize form controls with default dates (yesterday and today)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date

    this.dateRangeForm = this.formBuilder.group({
      startDate: [yesterday], // Yesterday's date
      endDate: [new Date()] // Today's date
    });

    const startDate = this.dateRangeForm.get('startDate')?.value;
    const endDate = this.dateRangeForm.get('endDate')?.value;

    const formattedStartDate = this.datePipe.transform(startDate, 'dd-MM-yyyy');
  const formattedEndDate = this.datePipe.transform(endDate, 'dd-MM-yyyy');


  const date = {start_date: formattedStartDate, end_date: formattedEndDate};
  this.otpStatusDashboardApi(date)

  this.registrationStatusDashboardApi(date)
    // console.log("start date", this.dateRangeForm.get('startDate')?.value);
    
  }


  


  onDateRangeApply() {
    const startDate = this.dateRangeForm.get('startDate')?.value;
    const endDate = this.dateRangeForm.get('endDate')?.value;

    const formattedStartDate = this.datePipe.transform(startDate, 'dd-MM-yyyy');
  const formattedEndDate = this.datePipe.transform(endDate, 'dd-MM-yyyy');


  const date = {start_date: formattedStartDate, end_date: formattedEndDate};
  

    console.log('date range :', date);

    if (startDate && endDate) {
      this.otpStatusDashboardApi(date)
      this.registrationStatusDashboardApi(date)
    } else {
      console.log("inalid date");
    }
  }

  otpStatusDashboardApi(dateRang: any) {

    this.spinner.show();
    this.otpStatus = ''
    this.common.dashboardOTPStatus(dateRang).subscribe(
      (res) => {
       
        if (res.api_status) {
          this.otpStatus = res

          if (res.otp_generated === 0) {
            this.otpStatusPercentage = 0
          } else {
            const calculatedPercentage = (res.otp_used / res.otp_generated) * 100
            this.otpStatusPercentage = Math.round(calculatedPercentage);
            
          }


          console.log('otp',  this.otpStatus, "per", this.otpStatusPercentage);
          this.otpStatusChart(this.otpStatusPercentage)
          this.spinner.hide();
        

        } else {
      this.spinner.hide();

          console.log('message', res.message);

          Swal.fire({
            icon: 'error',
            title: ` ${res.message}`,
          })
        }
      },
      (err) => {
      this.spinner.hide();

        // console.log('unable to log in', err);
        this.common.apiErrorHandler(err);
      }
    );
    





  }

  registrationStatusDashboardApi(dateRang: any) {

    this.spinner.show();
    this.registationStatus = ''
    this.common.dashboardRegistrationStatus(dateRang).subscribe(
      (res) => {
       
        if (res.api_status) {
          this.registationStatus = res

          console.log("registration stat", this.registationStatus);
          

          this.spinner.hide();
        

        } else {
      this.spinner.hide();

          console.log('message', res.message);

          Swal.fire({
            icon: 'error',
            title: ` ${res.message}`,
          })
        }
      },
      (err) => {
      this.spinner.hide();

        // console.log('unable to log in', err);
        this.common.apiErrorHandler(err);
      }
    );

  }

  otpStatusChart(percentage: any){
    this.chartOptions2 = {
      series: [percentage], // Single value
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: "70%"
          },
          dataLabels: {
            name: {
              offsetY: 15,
              show: false,
              color: "#888",
              fontSize: "18px"
            },
            value: {
              offsetY: -15,
              color: "#111",
              fontSize: "26px",
              show: true
            }
          }
        }
      },
      labels: ["Series A"], // Label for the single value
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250
            }
          }
        }
      ]
    };
  }


}
