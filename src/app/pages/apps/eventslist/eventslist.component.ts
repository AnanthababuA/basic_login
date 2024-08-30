import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DescriptiveService } from 'src/app/services/descriptive.service';
import { DatePipe } from '@angular/common';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ],
})
export class EventslistComponent {

  classvalue: number[] = Array.from({ length: 12 }, (_, index) => index + 1);

  events: any = {
    data: [],
    total: 0,
    page: 1,
    s_date: '',
    e_date: '',
    s_term: '',
    std: '',
    filter_sdate: '',
    filter_edate: ''
  }

  eventlist: FormGroup;

  constructor( private fb: FormBuilder, private spinner: NgxSpinnerService, private dbs: DashboardService, private datePipe: DatePipe, private ds: DescriptiveService) {

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 2);
 

    function formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());
      return `${day}-${month}-${year}`;
    }    

    // this.formattedToday = formatDate(today); // Format today's date
    // this.formattedYesterday = formatDate(yesterday);

    this.eventlist = this.fb.group({
      class_std: [],
      startDate: [yesterday, Validators.required ], // Add validation 
      endDate: [ today, Validators.required ] // Add validation
    },   
    ); 

  }

  handleApplyButtonClick() {

  }


  getFormattedDate1() {
    const startdate = this.eventlist.value.startDate;

    if (startdate) {
      return this.datePipe.transform(startdate, 'yyyy-MM-dd');
    }
    return null;
  }

  getFormattedDate2() {
    const enddate = this.eventlist.value.endDate;

    if (enddate) {
      return this.datePipe.transform(enddate, 'yyyy-MM-dd');
    }
    return null;
  }

  getEvents(): void {

    let page_no = this.events.page;

    let start_date;

    let end_date;

    if(this.events.s_date == '') {

        start_date = this.events.s_date

        end_date = this.events.e_date

    } else {

      start_date = `${this.events.s_date.year}-${this.events.s_date.month}-${this.events.s_date.day}`;

      end_date = `${this.events.e_date.year}-${this.events.e_date.month}-${this.events.e_date.day}`;

    }

    let s_term = this.events.s_term;

    let std = this.events.std;

    this.spinner.show();

    this.ds.getEventList(page_no, start_date, end_date, s_term, std).subscribe((res) => {

      this.spinner.hide();

      if(res.api_status === true) {

        this.events.data = res.data

        this.events.total = res.count

        let sdate = res.startdate.split('T')[0].split('-');

        let edate = res.enddate.split('T')[0].split('-');

        this.events.filter_sdate = res.startdate.split('T')[0];

        this.events.filter_edate = res.enddate.split('T')[0];

        this.events.s_date = {
          year: parseInt(sdate[0]), month: parseInt(sdate[1]), day: parseInt(sdate[2])
        }

        this.events.e_date = {
          year: parseInt(edate[0]), month: parseInt(edate[1]), day: parseInt(edate[2])
        }        

      }
    })

  }

  qpSubmit() {

    const formval = this.eventlist.value;

    console.log("formval", formval);

    this.events.page = 1

    const formattedstartDate = this.getFormattedDate1();
    const formattedendDate = this.getFormattedDate2();

    console.log("formattedstartDate", formattedstartDate, formattedendDate)

    // this.getEvents();

    const params = {
      startdate: formattedstartDate,
      enddate: formattedendDate
    }

    console.log("params", params);


    this.dbs.getlistofevent(params).subscribe( (res) => {
      console.log("res", res);

      if(res.api_status){
       this.events.data = res.data; 
      }
    }


    );
    
  }


}
