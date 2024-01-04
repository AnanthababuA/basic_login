// import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
// import { TablerIconsModule } from 'angular-tabler-icons';
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
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexGrid,
  ApexFill,
} from 'ng-apexcharts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material.module';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../spinner/spinner.component';

// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatOptionModule } from '@angular/material/core';
// import {
//   MatDialog,
//   MatDialogModule,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';

export type ChartOptions = {
  // series: ApexNonAxisChartSeries | undefined;
  // chart: ApexChart | undefined;
  // dataLabels: ApexDataLabels | undefined;
  // plotOptions: ApexPlotOptions | undefined;
  // legend: ApexLegend | undefined;
  // colors: string[] | undefined;
  // labels: string[] | undefined;


  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};

// export type ChartOptions = {
//   series: ApexAxisChartSeries | undefined;
//   chart: ApexChart | undefined;
//   dataLabels: ApexDataLabels | undefined;
//   plotOptions: ApexPlotOptions | undefined;
//   legend: ApexLegend | undefined;
//   colors: string[] | undefined;
// };

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
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss'],
  standalone: true,
    
    imports: [
      NgApexchartsModule,
      MaterialModule, 
      ReactiveFormsModule,
      NgxSpinnerModule,
      SpinnerComponent, 
      CommonModule,TablerIconsModule,
      


        ],
  encapsulation: ViewEncapsulation.None,

})
export class DashboardChartsComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  // @ViewChild("chart") chart: any;
  // public chartOptions: any;

  // public ourvisitorChart!: Partial<ourvisitorChart> | any;
  ourvisitorChart: any = {};
  dateRangeBar: any = {}
  chartOptions : any
  chartOptions2 : any
  dateRangeForm: FormGroup;

  isFormValid: boolean = false;

  otpStatus: any
  otpStatusPercentage: number =0;
  registationStatus: any;

  clamav= 0;
  integrity= 0;
  urlV= 0;
  usbv= 0;

  unitType = [7, 15, 30];
  usertypeControl = new FormControl(7);
  startDateControl = new FormControl(); 
  endDateControl = new FormControl();
  formGroup: FormGroup;

  isSpinnerVisible: { [key: string]: boolean } = {};

  dateRangeChartMessage: string = "No Data Available For The Chart";

  public mostvisitChart: any = {};

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private common: CommonServicesService,
    private spinner: NgxSpinnerService) {

      this.formGroup = new FormGroup({
        usertype: this.usertypeControl,
        startDate: this.startDateControl,
        endDate: this.endDateControl
      });
      this.updateDateRange(7); 
      
    // this.daterangealertstatus(this.clamav, this.integrity, this.urlV, this.usbv)

    

    // this.dateRangeBarChart()



    
  }

  dateRangeAlertChartSettings(cav: any, intg: any, urlv: any, usbv: any){

    console.log("numbers..", cav, intg, urlv, usbv);
    

    // most visit chart
    this.mostvisitChart = {
      series: [
        {
          name: 'Count',
          data: [cav, intg, urlv, usbv],
        },
        
      ],

      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 270,
        stacked: true,
      },
      colors: ['#5D87FF', '#49BEFF'],
      plotOptions: {
        bar: {
          borderRadius: [6],
          horizontal: false,
          barHeight: '60%',
          columnWidth: '40%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      yaxis: {
        tickAmount: 4,
      },
      xaxis: {
        categories: ['ClamAv', 'Integrity', 'URL Violation', 'USB Violation', ],
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'light',
        fillSeriesColor: false,

      //   enabled: true, // Ensure tooltips are enabled
      // custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
      //   const dataPointValue = series[seriesIndex][dataPointIndex];
      //   // Round the value to display only whole numbers
      //   const formattedValue = Math.round(dataPointValue);
      //   return `<div class="apexcharts-tooltip">${formattedValue}</div>`;
      // },
      },
    };

  }

  updateDateRange(selectedValue: any) {
    const currentDate = new Date();
    this.endDateControl.setValue(currentDate); // Set end date as today's date
    console.log("end date:", this.endDateControl.value);
    

    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - selectedValue); // Calculate start date
    this.startDateControl.setValue(startDate); // Set start date
    console.log("start date:", this.startDateControl.value);

    // const startDate = this.dateRangeForm.get('startDate')?.value;
    // const endDate = this.dateRangeForm.get('endDate')?.value;

    const formattedStartDate = this.datePipe.transform(startDate, 'dd-MM-yyyy');
  const formattedEndDate = this.datePipe.transform(this.endDateControl.value, 'dd-MM-yyyy');


  const date = {start_date: formattedStartDate, end_date: formattedEndDate};

  console.log("formated startdate",date);
  this.daterangealerts(date)
  
    
  }

  ngOnInit() {

    this.usertypeControl.valueChanges.subscribe(value => {
      console.log('Selected value:', value);
      this.updateDateRange(value);
    });
    
  //   this.dateRangeForm = this.formBuilder.group({
  //     startDate: ['',  Validators.required], // Initialize with default values if needed
  //     endDate: ['',  Validators.required],     // Initialize with default values if needed
  //   });

    

  //   // Initialize form controls with default dates (yesterday and today)
  //   const yesterday = new Date();
  //   yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date

  //   this.dateRangeForm = this.formBuilder.group({
  //     startDate: [yesterday,  Validators.required], // Yesterday's date
  //     endDate: [new Date(),  Validators.required] // Today's date
  //   });

   
  //   // this.dateRangeForm.reset();
  //   const startDate = this.dateRangeForm.get('startDate')?.value;
  //   const endDate = this.dateRangeForm.get('endDate')?.value;

  //   const formattedStartDate = this.datePipe.transform(startDate, 'dd-MM-yyyy');
  // const formattedEndDate = this.datePipe.transform(endDate, 'dd-MM-yyyy');


  // const date = {start_date: formattedStartDate, end_date: formattedEndDate};
  // this.otpStatusDashboardApi(date)

  // this.registrationStatusDashboardApi(date)
  //   // console.log("start date", this.dateRangeForm.get('startDate')?.value);
  
  //   this.daterangealerts(date);
  }

  daterangealertstatus(cav: any, intg: any, urlv: any, usbv: any){

    // console.log('cav',cav)
    // console.log('intg',intg)
    // console.log('urlv',urlv)
    // console.log('usbv',usbv)
    // const labels = ["ClamAv", "Integrity", "URL Violation", "USB Violation"];
    // const values = [5, 3, 7, 8];

    this.ourvisitorChart = {
      // series: [this.clamav, this.integrity, this.urlV, this.usbv],
      series: [cav, intg, urlv, usbv],
      // series: [1, 0, 1, 1],

      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 253,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '100%',
            background: 'transparent',
          },
        },
      },
      tooltip: {
        
      
        enabled: true,
        followCursor: false,
        // y: {
        //   formatter: (value: any, { seriesIndex, dataPointIndex }: { seriesIndex: number, dataPointIndex: number }) => {
        //     return `<div style="text-align: center; font-size: 16px;">${labels[dataPointIndex]}: ${values[dataPointIndex]}</div>`;
        //   }
        // }
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
      labels: ["ClamAv", "Integrity", "URL Violation", "USB Violation",],
      
      
      colors: ['#1e88e5','#ffb22b', '#7456f0', '#26c6da'],
  
      responsive: [{ breakpoint: 480, options: { chart: { height: 270 } } }],
      style: {
        fontSize: '18px', // Setting font size to 18px
        fontFamily: 'Poppins, sans-serif', // Font family if needed
      },
    };

  }

  dateRangeBarChart(){


    this.chartOptions = {
      series: [
        {
          name: "Actual",
          data: [
            {
              x: "2011",
              y: 1292,
            },
            {
              x: "2012",
              y: 4432,
            },
            {
              x: "2013",
              y: 5423,
            },
            {
              x: "2014",
              y: 6653,
            },
            {
              x: "2015",
              y: 8133,
            },
            {
              x: "2016",
              y: 7132,
            },
            {
              x: "2017",
              y: 7332,
            },
            {
              x: "2018",
              y: 6553,
            },
          ],
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
        position: "top",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          colors: ["#000"],
        },
        formatter: function (val:any) {
          return val;
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["Actual"],
        markers: {
          fillColors: ["#00E396"],
        },
      },
    };

  }

daterangealerts(date: any){


  this.isSpinnerVisible['dashDateRangeAlert'] = true;

  this.dateRangeChartMessage = "No Data Available For The Chart";
  this.common.alertstatus(date).subscribe( (res) => {
    // console.log("res alert", res);
    this.isSpinnerVisible['dashDateRangeAlert'] = false;

    if(res.api_status == true)
    {
      
      
      // this.clamav = parseFloat(res.percentage_data.ClamAV.toFixed(2))
      // this.integrity = parseFloat(res.percentage_data.Integrity.toFixed(2))
      // this.urlV = parseFloat(res.percentage_data.URLViolation.toFixed(2)) 
      // this.usbv = parseFloat(res.percentage_data.USBViolation.toFixed(2))

      // this.clamav = parseFloat(res.data.ClamAV.toFixed(2))
      // this.integrity = parseFloat(res.data.Integrity.toFixed(2))
      // this.urlV = parseFloat(res.data.URLViolation.toFixed(2)) 
      // this.usbv = parseFloat(res.data.USBViolation.toFixed(2))
      // console.log("llll",res);


      this.clamav = res.data.ClamAV
      this.integrity =res.data.Integrity
      this.urlV = res.data.URLViolation
      this.usbv = res.data.USBViolation
      

      this.daterangealertstatus(this.clamav, this.integrity, this.urlV, this.usbv)

      this.dateRangeAlertChartSettings(this.clamav, this.integrity, this.urlV, this.usbv)




    }else {
      // this.spinner.hide();

      // Swal.fire({
      //   icon: 'error',
      //   title: `${res.message}`,
      // });

      this.dateRangeChartMessage = `${res.exception}`
    }
  }, (error) => {
    this.spinner.hide();
    this.isSpinnerVisible['dashDateRangeAlert'] = false;


    this.common.apiErrorHandler(error);
    console.log('eerror---', error);
  }

  );

  

  // this.chartOptions = {
  //   // series: [44, 55, 13, 43],
  //   series: [44, 55, 13, 43],

  //   chart: {
  //     height: 253,
  //     // width: 380,
  //     type: "pie"
  //   },
  //   labels: ["ClamAv", "SSH", "Integrity", "URL Violation"],
  //   colors: ['#1e88e5','#ffb22b', '#abed5b', '#26c6da'],
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           // width: 200
  //           height: 270
  //         },
  //         legend: {
  //           position: "bottom"
  //         }
  //       }
  //     }
  //   ]
  // };

}

  // // onDateRangeApply() {
  // //   const startDate = this.dateRangeForm.get('startDate')?.value;
  // //   const endDate = this.dateRangeForm.get('endDate')?.value;

  // //   const formattedStartDate = this.datePipe.transform(startDate, 'dd-MM-yyyy');
  // // const formattedEndDate = this.datePipe.transform(endDate, 'dd-MM-yyyy');


  // // const date = {start_date: formattedStartDate, end_date: formattedEndDate};
  

  // //   // console.log('date range :', date);

  // //   if (startDate && endDate) {
  // //     this.otpStatusDashboardApi(date)
  // //     this.registrationStatusDashboardApi(date)
  // //   } else {
  // //     console.log("inalid date");
  // //   }

  // //   // this.daterangealerts(date);
    
  // // }

  // otpStatusDashboardApi(dateRang: any) {

  //   this.isSpinnerVisible['dashOtpStatusCard'] = true;

  //   this.spinner.show();
  //   this.otpStatus = ''
  //   this.common.dashboardOTPStatus(dateRang).subscribe(
  //     (res) => {
  //   this.isSpinnerVisible['dashOtpStatusCard'] = false;
       
  //       if (res.api_status) {
  //         this.otpStatus = res

  //         if (res.otp_generated === 0) {
  //           this.otpStatusPercentage = 0
  //         } else {
  //           const calculatedPercentage = (res.otp_used / res.otp_generated) * 100
  //           this.otpStatusPercentage = Math.round(calculatedPercentage);
            
  //         }


  //         // console.log('otp',  this.otpStatus, "per", this.otpStatusPercentage);
  //         this.otpStatusChart(this.otpStatusPercentage)
  //         this.spinner.hide();
        

  //       } else {
  //     this.spinner.hide();

  //         console.log('message', res.message);

  //         Swal.fire({
  //           icon: 'error',
  //           title: ` ${res.message}`,
  //         })
  //       }
  //     },
  //     (err) => {
  //   this.isSpinnerVisible['dashOtpStatusCard'] = false;

  //     this.spinner.hide();

  //       // console.log('unable to log in', err);
  //       this.common.apiErrorHandler(err);
  //     }
  //   );






  // }

  // registrationStatusDashboardApi(dateRang: any) {
  //   this.isSpinnerVisible['dashRegClientStatus'] = true;

  //   this.spinner.show();
  //   this.registationStatus = ''
  //   this.common.dashboardRegistrationStatus(dateRang).subscribe(
  //     (res) => {
  //   this.isSpinnerVisible['dashRegClientStatus'] = false;

       
  //       if (res.api_status) {
  //         this.registationStatus = res

  //         // console.log("registration stat", this.registationStatus);
          

  //         this.spinner.hide();
        

  //       } else {
  //     this.spinner.hide();

  //         // console.log('message', res.message);

  //         Swal.fire({
  //           icon: 'error',
  //           title: ` ${res.message}`,
  //         })
  //       }
  //     },
  //     (err) => {
  //   this.isSpinnerVisible['dashRegClientStatus'] = false;

  //     this.spinner.hide();

  //       // console.log('unable to log in', err);
  //       this.common.apiErrorHandler(err);
  //     }
  //   );

  // }

  // otpStatusChart(percentage: any){
  //   this.chartOptions2 = {
  //     series: [percentage], // Single value
  //     chart: {
  //       height: 350,
  //       type: "radialBar"
  //     },
  //     plotOptions: {
  //       radialBar: {
  //         startAngle: -90,
  //         endAngle: 90,
  //         hollow: {
  //           size: "70%"
  //         },
  //         dataLabels: {
  //           name: {
  //             offsetY: 15,
  //             show: false,
  //             color: "#888",
  //             fontSize: "18px"
  //           },
  //           value: {
  //             offsetY: -15,
  //             color: "#111",
  //             fontSize: "26px",
  //             show: true
  //           }
  //         }
  //       }
  //     },
  //     labels: ["Series A"], // Label for the single value
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             height: 250
  //           }
  //         }
  //       }
  //     ]
  //   };
  // }


  // sampleShow(){
  //   this.isSpinnerVisible['card1'] = true;
  // }

  // sampleHide(){
  //   this.isSpinnerVisible['card1'] = false;
  // }

 
}
