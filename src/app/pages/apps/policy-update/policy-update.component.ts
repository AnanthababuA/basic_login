import { Component } from '@angular/core';

@Component({
  selector: 'app-policy-update',
  templateUrl: './policy-update.component.html',
  styleUrls: ['./policy-update.component.scss']
})
export class PolicyUpdateComponent {
  loaderStatus: string = 'loading...';
  showEventTable: boolean = true;
  dtOptions: any = {};

  // In your component class
data = Array.from({ length: 12 }, (_, index) => ({ unitName: index + 1 }));


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'lBfrtip',
      paging: true,
      lengthMenu: [5, 10, 25, 50],

      initComplete: function () {
        $('.button').removeClass('dt-button');
      },
      buttons: [

        {
          extend: 'copy',
          text: '<i class="mdi mdi-content-copy"></i> Copy',
          className: 'bg-success rounded btn-sm btn btn-warning mx-2 text-dark',

        },
        {
          extend: 'print',
          text: '<i class="mdi mdi-printer"></i> Print',
          className: ' bg-warning rounded btn-sm btn btn-primary mx-2 text-dark',
        },
        
        // {
        //   extend: 'excel',
        //   text: '<i class="mdi mdi-printer"></i> Excel',
        //   className: ' bg-primary rounded btn-sm btn btn-primary mx-2 text-dark',
        // },
        
        {
          extend: 'csv',
          text: '<i class="mdi mdi-file-table"></i> CSV',
          className: 'bg-error rounded btn-sm btn btn-success  text-dark',
        }
      ]
    };

  

    



    console.log("in ng init");

    // this.unitNameLocalAdminfun()

    // this.unitTypeLocalAdminfun()

  }

  tabChanged(event: any) {
    console.log("tab changed", event);
    if (event === 1) {
      console.log("mange unit call");
      // this.showEventTable = false;

  



    }
    // You can handle the tab change event here if needed
  }



}
