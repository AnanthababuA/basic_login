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

    this.policySummaryAPI();

    this.otpStatusChart(80)
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

          

          try {
            this.refreshDataTable();
          } catch (error) {
            console.error('An error occurred while refreshing the DataTable:', error);
          }
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

          try {
            this.refreshDataTable();
          } catch (error) {
            console.error('An error occurred while refreshing the DataTable:', error);
          }

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

          try {
            this.refreshDataTable();
          } catch (error) {
            console.error('An error occurred while refreshing the DataTable:', error);
          }

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

    // Timeout helps avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      if (this.datatableElement) {
        this.datatableElement.dtOptions = this.dtOptions;
        this.datatableElement.ngOnInit();
      }
    });
  }
  chartOptions2 : any
  otpStatusChart(percentage: any){
    this.chartOptions2 = {
      series: [percentage], // Single value
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: "70%"
          },
          dataLabels: {
            name: {
              offsetY: 15,
              show: false,
              color: "#888",
              fontSize: "18px"
            },
            value: {
              offsetY: -15,
              color: "#111",
              fontSize: "26px",
              show: true
            }
          }
        }
      },
      labels: ["Series A"], // Label for the single value
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250
            }
          }
        }
      ]
    };
  }
}
