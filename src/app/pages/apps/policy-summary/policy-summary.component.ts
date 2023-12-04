import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
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

  // summary icon = {ip: "icon"}

  totalEntries: any;

  loaderStatus: string = 'Loading ...';

  showURLDetails: boolean = false;

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
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;">
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

    this.policySummaryAPI();
  }

  logSelectedValue() {
    // console.log('Selected value:', this.currentRole);
    if (this.currentRole === 'Summary') {
      // console.log('summary');
      this.policySummaryAPI();
    }

    if (this.currentRole === 'URL') {
      // console.log('url');
      this.urlIpInput.search_term = '';
      this.urlDetails = '';
      this.showURLDetails = false;
      this.policyUrlDetailsAPI(this.urlIpInput);
    }

    if (this.currentRole === 'IP') {
      // console.log('ip');
      this.policyIpDetailsAPI(this.urlIpInput);
    }
  }

  policySummaryAPI() {
    this.spinner.show();

    this.policySummary = '';
    this.common.policySummary().subscribe(
      (res: any) => {
        this.spinner.hide();

        if (res.api_status === true) {
          //           this.policySummary = res.data;
          // console.log(this.policySummary);

          const dataFromAPI = res.data;

          // Modifying the received data to add the 'icon' property
          dataFromAPI.forEach((item: any) => {
            // Logic to assign icons based on policy_type
            // Example logic:
            if (item.policy_type === 'IP') {
              item.icon = 'anchor';
            } else if (item.policy_type === 'URL') {
              item.icon = 'link';
            }
          });

          // Assigning the modified data to this.policySummary
          this.policySummary = dataFromAPI;

          console.log('icon', this.policySummary);

          this.refreshDataTable();
        }
      },
      (error) => {
        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

  policyUrlDetailsAPI(serachTerm: any) {
    this.spinner.show();

    this.showURLDetails = false;
    this.urlDetails = '';
    this.totalEntries = '';
    this.common.policyUrlDetails(serachTerm).subscribe(
      (res: any) => {
        this.spinner.hide();

        if (res.api_status === true) {
          this.showURLDetails = true;
          this.urlDetails = res.data;

          this.totalEntries = res.total_count;

          this.refreshDataTable();

          // console.log('url details', this.urlDetails);
        }
      },
      (error) => {
        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

  policyIpDetailsAPI(serachTerm: any) {
    this.spinner.show();

    this.ipDetails = '';
    this.totalEntries = '';
    this.ipDetails = '';
    this.common.policyIpDetails(serachTerm).subscribe(
      (res: any) => {
        this.spinner.hide();

        if (res.api_status === true) {
          this.ipDetails = res.data;
          this.totalEntries = res.total_count;

          this.refreshDataTable();

          // dataSource1 = PRODUCT_DATA;

          // console.log('ipDetails details', this.ipDetails);
        }
      },
      (error) => {
        this.spinner.hide();

        this.common.apiErrorHandler(error);
        // console.log('eerror---', error);
      }
    );
  }

  ipSearch() {
    // console.log('ipserach', this.ipSearchText);

    this.urlIpInput.search_term = this.ipSearchText;

    this.policyIpDetailsAPI(this.urlIpInput);
  }

  urlSearch() {
    // console.log('ipserach', this.urlSearchText);

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
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;">
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

    // Timeout helps avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      if (this.datatableElement) {
        this.datatableElement.dtOptions = this.dtOptions;
        this.datatableElement.ngOnInit();
      }
    });
  }
}
