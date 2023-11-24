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
          text: `<span style="display:flex; align-items: center;"> Copy</span>`,
          className:
            'bg-success rounded btn-sm btn btn-warning m-x-6 text-dark',
        },
        {
          extend: 'print',
          text: ' <span style="display:flex; align-items: center;"> Print</span>',
          className:
            ' bg-warning rounded btn-sm btn btn-primary mx-2 text-dark',
        },
        {
          extend: 'csv',
          text: '<span style="display:flex; align-items: center;"> CSV</span>',
          className: 'bg-error rounded btn-sm btn btn-success  text-dark',
        },
      ],
    };

    this.spinner.show();
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
    console.log('row', i);
    const info = { client_id: i.client_id };
     this.clientInfoApi(info);

    
  }

  

  

  openDialogPatch() {
    const dialogRef = this.dialog.open(ClientInfoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  clientInfoApi(info: any) {
    this.spinner.show();
    this.common.clientInfo(info).subscribe(
      (res: any) => {
        console.log('in the unit name subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('res is ---', res.data);

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

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }
}
