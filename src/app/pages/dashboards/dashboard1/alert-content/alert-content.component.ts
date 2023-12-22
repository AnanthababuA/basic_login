import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert-content',
  templateUrl: './alert-content.component.html',
  styleUrls: ['./alert-content.component.scss'],
  standalone: true,
  imports: [DataTablesModule, CommonModule,  MatButtonModule, MatDialogModule ]
})
export class AlertContentComponent {

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

    this.common.alertcontent().subscribe( (res) => {
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
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;color: white;font-size: 14px;">
          
            Copy</span>`,
          className: 'bg-primary f-s-12 p-x-12 p-y-6 m-l-8  rounded text-white',
        },
        {
          extend: 'print',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: white;font-size: 14px;">
          
           Print</span>`,
          className: ' bg-primary f-s-12 p-x-12 p-y-6 rounded text-white',
        },
        {
          extend: 'csv',
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: white;font-size: 14px;"> 
          
          CSV</span>`,
          className: 'bg-primary f-s-12 p-x-12 p-y-6 m-r-8 rounded text-white',
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
