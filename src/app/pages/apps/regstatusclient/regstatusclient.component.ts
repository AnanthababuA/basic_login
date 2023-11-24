import { Component, ViewChild, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-regstatusclient',
  templateUrl: './regstatusclient.component.html',
  styleUrls: ['./regstatusclient.component.scss']
})
export class RegstatusclientComponent {

  clientRegStatus: any;
  dtOptions: any

  showTable : boolean = false;

  loaderStatus: string = 'Loading...';


  constructor(private common: CommonServicesService, private spinner: NgxSpinnerService) {

  }
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
    this.common.Registeredstatusclients().subscribe((res) => {
      if (res.api_status === true) {

        this.clientRegStatus = res.data;
        this.showTable = true

        this.spinner.hide();
        

      }
      else {
        this.spinner.hide();

        Swal.fire({
          title: 'Unable to load Date',
          text: '',
          icon: 'info'
        })

      }
        });

}



}
