import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
// import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-policy-summary',
  templateUrl: './policy-summary.component.html',
  styleUrls: ['./policy-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PolicySummaryComponent {
  policySummary: any;

  urlDetails: any;

  ipDetails: any;

  dtOptions: any = {};

  currentRole!: string;

  ipSearchText: any;

  urlSearchText: any;

  urlIpInput = {
    search_term: '',
  };

  totalEntries: any



  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private ts: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentRole = 'Summary';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: false,
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
          // text: `<span style="display:flex; align-items: center;"><i-tabler name="menu-2" class="icon-20 d-flex"></i-tabler> Copy</span>`,
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

    this.policySummaryAPI();
  }

  logSelectedValue() {
    console.log('Selected value:', this.currentRole);
    if (this.currentRole === 'Summary') {
      console.log('summary');
      this.policySummaryAPI();
    }

    if (this.currentRole === 'URL') {
      console.log('url');
      this.urlIpInput.search_term = '';
      this.policyUrlDetailsAPI(this.urlIpInput);
    }

    if (this.currentRole === 'IP') {
      console.log('ip');
      this.policyIpDetailsAPI(this.urlIpInput);
    }
  }

  policySummaryAPI() {
    this.spinner.show();

    this.common.policySummary().subscribe(
      (res: any) => {
        this.spinner.hide();

        if (res.api_status === true) {
          this.policySummary = res.data;

          // dataSource1 = PRODUCT_DATA;

          console.log('policy summary', this.policySummary);

          console.log('policy summary-ip', this.policySummary.IP);

          console.log('policy summary-ip-total', this.policySummary.IP.total);

          // this.dataSource1 = PRODUCT_DATA;
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }


  policyUrlDetailsAPI(serachTerm: any) {
    this.spinner.show();

    this.common.policyUrlDetails(serachTerm).subscribe(
      (res: any) => {
        this.spinner.hide();

        if (res.api_status === true) {
          // this.urlDetails = {};
          this.urlDetails = res.data;
          // dataSource1 = PRODUCT_DATA;

          this.totalEntries=res.total_count

          this.refreshDataTable();

          console.log('url details', this.urlDetails);
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

  policyIpDetailsAPI(serachTerm: any) {
    this.spinner.show();

    this.common.policyIpDetails(serachTerm).subscribe(
      (res: any) => {
        this.spinner.hide();

        if (res.api_status === true) {
          this.ipDetails = res.data;
          this.totalEntries=res.total_count

          this.refreshDataTable();


          // dataSource1 = PRODUCT_DATA;

          console.log('ipDetails details', this.ipDetails);
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

  ipSearch() {
    console.log('ipserach', this.ipSearchText);

    this.urlIpInput.search_term = this.ipSearchText;

    this.policyIpDetailsAPI(this.urlIpInput);
  }

  urlSearch() {
    console.log('ipserach', this.urlSearchText);

    this.urlIpInput.search_term = this.urlSearchText;

    this.policyUrlDetailsAPI(this.urlIpInput);
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      
      searching: false,
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
          // text: `<span style="display:flex; align-items: center;"><i-tabler name="menu-2" class="icon-20 d-flex"></i-tabler> Copy</span>`,
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

    // Timeout helps avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      if (this.datatableElement) {
        this.datatableElement.dtOptions = this.dtOptions;
        this.datatableElement.ngOnInit();
      }
    });
  }

}
