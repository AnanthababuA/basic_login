import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTableDirective,DataTablesModule } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-last-communi-alertpop',
  templateUrl: './last-communi-alertpop.component.html',
  styleUrls: ['./last-communi-alertpop.component.scss'],
  standalone: true,
  imports: [DataTablesModule, CommonModule,  MatButtonModule,MatDialogModule ]
})
export class LastCommuniAlertpopComponent {

  alertData : any
  dtOptions : any
  showTable : boolean = false;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    
  ) {}

  ngOnInit(): void {
    this.alertData = '';
    this.dataTableSetting()
    this.logReceivedAPI()

  }

  // ngAfterViewInit(): void {
  //   this.logData = '';
  //   this.dataTableSetting();
  //   this.logReceivedAPI();
  // }

  logReceivedAPI() {
    this.spinner.show();
    this.alertData = '';

    this.common.lastcomalertdetails().subscribe( (res) => {
      console.log("alert details", res)
      if (res.api_status === true) {
        this.spinner.hide();
        this.alertData = res.data;

        this.showTable = true;
        this.refreshDataTable() 
      } else {
        this.spinner.hide();

        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        });
      }
    }
  
    );

    // this.common.dashboardLogReceivedDetails().subscribe(
    //   (res: any) => {
    //     if (res.api_status === true) {
    //       this.spinner.hide();
    //       this.alertData = res.data;

    //       this.showTable = true;
    //       this.refreshDataTable() 
    //     } else {
    //       this.spinner.hide();

    //       Swal.fire({
    //         icon: 'error',
    //         title: `${res.message}`,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.spinner.hide();

    //     this.common.apiErrorHandler(error);
    //     // console.log('eerror---', error);
    //   }
    // );
  }

  dataTableSetting(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        searchPlaceholder: 'Search here',
      },
      dom: 'lBfrtip',

      initComplete: function () {
        $('.button').removeClass('dt-button');
      },
      buttons: [
        {
          extend: 'copy',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;color: black;">
          <svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>
            Copy</span>`,
          className: 'bg-success f-s-12 p-x-8 p-y-4 m-x-8  rounded text-white',
        },
        {
          extend: 'print',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;">
          <svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
           Print</span>`,
          className: ' bg-warning f-s-12 p-x-8 p-y-4 rounded text-white',
        },
        {
          extend: 'csv',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;"> 
          <svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-spreadsheet" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M8 11h8v7h-8z" /><path d="M8 15h8" /><path d="M11 11v7" /></svg>
          CSV</span>`,
          className: 'bg-error f-s-12 p-x-8 p-y-4 m-x-8 rounded text-white',
        },
      ],
    };
  }


  refreshDataTable() {
    if (this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.rerender();
      });
    }
  }

  rerender() {

    this.dataTableSetting()
    setTimeout(() => {
      if (this.datatableElement) {
        this.datatableElement.dtOptions = this.dtOptions;
        this.datatableElement.ngOnInit();
      }
    });
  }




}
