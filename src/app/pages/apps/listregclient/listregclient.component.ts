import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
// import { RegistrationserviceService } from 'src/app/services/registrationservice.service';
import Swal from 'sweetalert2';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ClientInfoComponent } from './client-info/client-info.component';

@Component({
  selector: 'app-listregclient',
  templateUrl: './listregclient.component.html',
  styleUrls: ['./listregclient.component.scss'],
})
export class ListregclientComponent {
  listOfRegClient: any;
  dtOptions: any;

  showTable: boolean = false;

  loaderStatus: string = 'Loading...';

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
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
          className: 'bg-error f-s-12 p-x-8 p-y-4 rounded text-white',
        },
      ],
    };

    this.spinner.show();
    this.listOfRegClient = '';
        this.showTable = false;
    this.common.Registeredclients().subscribe((res) => {
      if (res.api_status === true) {
        this.listOfRegClient = res.data;
        this.showTable = true;
        this.spinner.hide();
      } else {
        this.spinner.hide();

        Swal.fire({
          title: 'Unable to load Date',
          text: '',
          icon: 'info',
        });
      }
    });
  }
rowInfo(i: any) {
    const info = { client_id: i.client_id };
     this.clientInfoApi(info);

    
  }

  

  

  openDialogPatch() {
    const dialogRef = this.dialog.open(ClientInfoComponent);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  clientInfoApi(info: any) {
    this.spinner.show();
    localStorage.removeItem('clientId');
    this.common.clientInfo(info).subscribe(
      (res: any) => {

        if (res.api_status === true) {
          this.spinner.hide();


          localStorage.setItem('clientId', JSON.stringify(res));
          this.openDialogPatch();
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
        console.log('eerror---', error);
      }
    );
  }


}
