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
          className: 'bg-primary f-s-12 p-x-12 p-y-6  rounded text-white',
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
          icon: 'error',
            title: `${res.message}`,
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
