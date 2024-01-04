import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '../../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export type ChartOptions = {
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

@Component({
  selector: 'app-date-range-alert',
  templateUrl: './date-range-alert.component.html',
  styleUrls: ['./date-range-alert.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    
   
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    
    MatNativeDateModule,
    NgApexchartsModule,MatButtonModule
  ]
})
export class DateRangeAlertComponent {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);


  public mostvisitChart: Partial<ChartOptions> | any;


  constructor(){
    this.mostvisitChart = {
      series: [
        {
          name: 'San Francisco',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Diego',
          data: [13, 23, 20, 8, 13, 27],
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
        categories: ['01', '02', '03', '04', '05', '06'],
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
