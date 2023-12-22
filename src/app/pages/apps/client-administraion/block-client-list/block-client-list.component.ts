import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';
import { UnblockClientFormComponent } from './unblock-client-form/unblock-client-form.component';

@Component({
  selector: 'app-block-client-list',
  templateUrl: './block-client-list.component.html',
  styleUrls: ['./block-client-list.component.scss']
})
export class BlockClientListComponent {

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

    this.spinner.show();
    this.listOfDeletedClient = '';
    this.showTable = false;
    this.common.blockClientList().subscribe((res) => {
      if (res.api_status === true) {
        this.listOfDeletedClient = res.data;
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
    localStorage.removeItem('delteClientInfo');

  }

  openDialogDeleteClientForm() {
    const dialogRef = this.dialog.open(UnblockClientFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  unblockClient(row: any) {
    console.log('row', row);

    localStorage.removeItem('dclient');
    localStorage.setItem('dclient', JSON.stringify(row));

    // this.openDialogDeleteClientForm()
    this.openDialog()
  }

  reloadParentComponent() {
    // Your logic to reload the parent component
    console.log('Reloading parent component...');

    this.ngOnInit()
  }

  openDialog() {
    const dialogRef = this.dialog.open(UnblockClientFormComponent, {
     
      // You can add more dialog configuration options here
    });

    dialogRef.componentInstance.reloadParent.subscribe(() => {
      this.reloadParentComponent(); // Call the function to reload the parent component
    });
  }


  // ******************************************** 



}
