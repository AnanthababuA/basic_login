import {
  Component,
  HostListener,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, NgControl, Validators } from '@angular/forms';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonServicesService } from 'src/app/services/common-services.service';

import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manageunit',
  templateUrl: './manageunit.component.html',
  styleUrls: ['./manageunit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageunitComponent {
  dtOptions: any = {};
  // dtOptions: any;
  // dtTrigger: Subject<any> = new Subject<any>();
  // dummyData: any[] = [];

  loaderStatus: string = 'Loading...';

  showEventTable: boolean = false;

  manageUnitDetails: any[] = [];
  unitName: any;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  unitDetails = {
    unit_id: '',
    unit_name: '',
    unit_desc: '',
  };

  deleteUnit = {
    unit_id: '',
  };

  secondFormGroup = this._formBuilder.group({
    unitname: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{0,10}$/)],
    ],
    unitdesc: [
      '',
      [Validators.required, Validators.pattern(/^[\s\S]{0,200}$/)],
    ],
    unitid: ['', Validators.required],
  });

  //   constructor(private _formBuilder: FormBuilder) {}
  // }

  displayedColumns = ['id', 'name', 'progress', 'color', 'color2'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  params: Partial<{ unitname: string | null; unitdesc: string | null }>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['id', 'name', 'progress', 'color', 'color2']
        : ['id', 'name', 'progress', 'color', 'color2'];
    });

    // Create 100 users
    const users: UserData[] = [];
    // for (let i = 1; i <= 100; i++) {
    //   users.push(createNewUser(i));
    // }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  ngOnInit(): void {

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
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;">
          <svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>
            Copy</span>`,
          className: 'bg-success f-s-12 p-x-8 p-y-4 m-x-8  m-x-8 rounded text-white',
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
          text: `<span style="display:flex; align-items: center;font-weight: initial;color: black;color: black;"> 
          <svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-spreadsheet" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M8 11h8v7h-8z" /><path d="M8 15h8" /><path d="M11 11v7" /></svg>
          CSV</span>`,
          className: 'bg-error f-s-12 p-x-8 p-y-4 rounded text-white',
        },
      ],
    };




    this.unitNameLocalAdminfun();

    

    // Initialize editMode array with 'false' for each row initially
    this.editMode = new Array(this.manageUnitDetails.length).fill(false);
  }

  unitNameLocalAdminfun() {
    // console.log();
    this.spinner.show();
    this.unitName = '';
    this.common.unitNameLocalAdmin().subscribe(
      (res: any) => {
        // console.log('in the unit name subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          this.unitName = res.data;

          // console.log('unit Name: ', this.unitName);
          this.spinner.hide();
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
        // console.log('eerror---', error);
        // this.common.apiErrorHandler(error);
      }
    );
  }

  tabChanged(event: any) {
    // console.log('tab changed', event);
    if (event === 1) {
      // console.log('mange unit call');
      this.showEventTable = false;
      this.unitDetailsAPI();
    }
    // You can handle the tab change event here if needed
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  unitDetailsAPI() {
    this.spinner.show();
    this.common.UnitDetails().subscribe(
      (res) => {
        // console.log('log in111');

        if (res.api_status) {
          this.manageUnitDetails = res.data_value;
          // console.log('manage unit details', this.manageUnitDetails);
          this.showEventTable = true;
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.showEventTable = false;
          // console.log('message', res.message);
          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (err) => {
        this.spinner.hide();

        // console.log('unable to log in', err);
        // this.common.apiErrorHandler(err);
      }
    );
  }
  // Inside your component class
  editMode: boolean[] = []; // To toggle between view and edit mode for each row
  originalValues: any[] = [];

  editRow(index: number) {
    // Toggle the edit mode for the selected row
    this.editMode[index] = !this.editMode[index];
    if (this.editMode[index]) {
      // Store original values before editing starts
      this.originalValues[index] = {
        unit_name: this.manageUnitDetails[index].unit_name,
        unit_desc: this.manageUnitDetails[index].unit_desc,
      };
    } else {
      // Revert changes on cancel
      this.manageUnitDetails[index].unit_name =
        this.originalValues[index].unit_name;
      this.manageUnitDetails[index].unit_desc =
        this.originalValues[index].unit_desc;
    }
  }

  // Create a method to save changes when 'Save' is clicked
  saveChanges(index: number) {
    // Save changes made to the row here, for example:
    // console.log('Updated Unit Name:', this.manageUnitDetails[index].unit_name);
    // console.log('Updated Unit Desc:', this.manageUnitDetails[index].unit_desc);
    // console.log('Updated Unit Desc:', this.manageUnitDetails[index].unit_id);

    this.unitDetails.unit_id = this.manageUnitDetails[index].unit_id;
    this.unitDetails.unit_name = this.manageUnitDetails[index].unit_name;
    this.unitDetails.unit_desc = this.manageUnitDetails[index].unit_desc;
    // console.log('res is', this.unitDetails);
    this.editUnitApi();

    // Toggle back to view mode after saving changes
    this.editMode[index] = false;
  }
  deleteRow(index: number) {
    // Implement the logic to delete the row using the provided index
    // For example:
    // this.manageUnitDetails.splice(index, 1);
    this.deleteUnit.unit_id = this.manageUnitDetails[index].unit_id;

    Swal.fire({
      title: 'Do you realy want to delete unit',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUnitApi();
      } else if (result.isDenied) {
        Swal.fire('Upload file cancelled', '', 'info');
      }
    });

    // this.deleteUnitApi()
    // Additional logic for deleting the row...

    // Ensure to update other necessary data or perform delete operations here
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submit() {
    // console.log('submit');
    // console.log('secondform====', this.secondFormGroup);

    // const unitnameValue = this.secondFormGroup?.get('unitname')?.value;
    // const unitdescValue = this.secondFormGroup?.get('unitdesc')?.value;

    // // console.log('unitname:', unitnameValue);
    // // console.log('unitdesc:', unitdescValue);

    if (this.secondFormGroup.valid) {
      // Both fields are filled; perform the submission
      // console.log('Submit data:', this.secondFormGroup.value);
      this.params = this.secondFormGroup.value;
      // console.log('paramsss', this.params);

      this.spinner.show();
      this.common.createUnit(this.secondFormGroup.value).subscribe(
        (res) => {
          // this.spinner.hide();

          // console.log('log in111');
          this.unitNameLocalAdminfun();

          if (res.api_status) {
            this.spinner.hide();

            // console.log('otp', res);

            Swal.fire({
              icon: 'success',
              title: `${res.message}`,
            }).then(() => {
              // this.router.navigate(['dashboard']);
            });

            // alert("OTP Generated Successfully\n"+ res.otp);
            // this.isPopupVisible = 1;
            // // console.log('Form values:', this.generateOTPForm.value.callerName);

            // this.otpValue = res.otp;
            this.spinner.hide();
          } else {
            this.spinner.hide();

            Swal.fire({
              icon: 'error',
              title: `${res.message}`,
            });
            // console.log('message', res.message);
          }
        },
        (err) => {
          this.spinner.hide();

          // console.log('unable to log in', err);
          // this.common.apiErrorHandler(err);
        }
      );

      this.secondFormGroup.reset();

      // Clear validation errors for each form control
      Object.keys(this.secondFormGroup.controls).forEach((controlName) => {
        const control = this.secondFormGroup.get(controlName);
        if (control) {
          control.setErrors(null);
        }
      });
    } else {
      // Show validation messages and prevent submission
      // this.secondFormGroup.markAllAsTouched();
    }

    // Access specific values
  }

  editUnitApi() {
    // console.log();
    this.spinner.show();
    this.common.editUnit(this.unitDetails).subscribe(
      (res: any) => {
        // console.log('in the unit name subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          // this.unitName = res.data
          Swal.fire({
            icon: 'success',
            title: `${res.message}`,
          });
          // // console.log("unit Name: ", this.unitName);
          this.spinner.hide();
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
        // console.log('eerror---', error);
      }
    );
  }

  deleteUnitApi() {
    // console.log();
    this.spinner.show();
    this.common.deleteUnit(this.deleteUnit).subscribe(
      (res: any) => {
        // console.log('in the unit name subscribe');

        if (res.api_status === true) {
          this.spinner.hide();
          this.unitDetailsAPI();

          // this.unitName = res.data
          Swal.fire({
            icon: 'success',
            title: `${res.message}`,
          });
          // // console.log("unit Name: ", this.unitName);
          this.spinner.hide();
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
        // console.log('eerror---', error);
      }
    );
  }
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  color2: string;
}
