import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleted-client-list',
  templateUrl: './deleted-client-list.component.html',
  styleUrls: ['./deleted-client-list.component.scss']
})
export class DeletedClientListComponent {
  listOfDeletedClient: any;
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

    this.listOfDeletedClientAPI()
  }


// rowInfo(i: any) {
//     const info = { client_id: i.client_id };
//      this.listOfDeletedClient(info);

    
//   }

  

  

  // openDialogPatch() {
  //   const dialogRef = this.dialog.open(ClientInfoComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //   });
  // }

  listOfDeletedClientAPI() {
    this.spinner.show();
    // localStorage.removeItem('clientId');
    this.common.deletedClientList().subscribe(
      (res: any) => {

        if (res.api_status === true) {
          this.spinner.hide();

          console.log("res is ..", res);

          this.listOfDeletedClient = res.data

          this.showTable = true;
          

          // localStorage.setItem('clientId', JSON.stringify(res));
          // this.openDialogPatch();
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
