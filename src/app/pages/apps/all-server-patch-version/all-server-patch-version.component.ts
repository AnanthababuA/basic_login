import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-server-patch-version',
  templateUrl: './all-server-patch-version.component.html',
  styleUrls: ['./all-server-patch-version.component.scss']
})
export class AllServerPatchVersionComponent {
  allServerPatch: any;

  dtOptions: any;

  showTable: boolean = false;

  loaderStatus: string = 'Loading...';

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
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
          className: 'bg-primary f-s-12 p-x-12 p-y-6 m-r-8 rounded text-white',
        },
       
      ],
    };

    this.spinner.show();
    this.common.allServerPatchVersion().subscribe((res) => {
      if (res.api_status === true) {
        this.allServerPatch = res.data;
        this.showTable = true;
        this.spinner.hide();
      } else {
        this.spinner.hide();

        Swal.fire({
          title: `${res.message}`,
          text: '',
          icon: 'info',
        });
      }
    });
  }
 

}
