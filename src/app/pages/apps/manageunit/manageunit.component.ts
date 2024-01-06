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
import { SelectSearchComponent } from '../select-search/select-search.component';




@Component({
  selector: 'app-manageunit',
  templateUrl: './manageunit.component.html',
  styleUrls: ['./manageunit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ManageunitComponent {
 

  unitNameUpdated: any = [];
  // selectData: any = [
  //   { id: 'bank1', name: 'Bank One' },
  //   { id: 'bank2', name: 'Bank Two' },
  //   { id: 'bank3', name: 'Bank Three' },
  //   { id: 'bank31', name: 'Bank Three' }
  // ];

  selectedBank1: any = null;
  selectedBank2: any | null = null;
  selectedBank3: any | null = null;

  onBankSelected(bank: any, selectNumber: number) {
    if (selectNumber === 1) {
      this.selectedBank1 = bank;
      console.log("selectd value", this.selectedBank1.id);
      this.secondFormGroup.value.unitid =  this.selectedBank1.id;
      console.log("form data..,",this.secondFormGroup.value);
      
    } else if (selectNumber === 2) {
      this.selectedBank2 = bank;
    } else if (selectNumber === 3) {
      this.selectedBank3 = bank;
    }
  }
  @ViewChild(SelectSearchComponent) selectSearch!: SelectSearchComponent; // ViewChild reference

 

  // resetSelectData() {

  //   console.log("reset field");
    
  //   // Reset the value and reassign the original value after a short delay
  //   this.unitNameUpdated = null; // Reset the data

  //   // Reassign the original value after a delay (e.g., 100ms)
  //   // setTimeout(() => {
  //   //   this.unitNameUpdated = this.originalUnitNameUpdated;
  //   // }, 100);
  // }


  dtOptions: any = {};
  // dtOptions: any;
  // dtTrigger: Subject<any> = new Subject<any>();
  // dummyData: any[] = [];

  loaderStatus: string = 'Loading...';

  showEventTable: boolean = false;

  manageUnitDetails: any[] = [];
  unitName: any;
 


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
    unitid: [''],
  });



  displayedColumns = ['id', 'name', 'progress', 'color', 'color2'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  params: Partial<{ unitname: string | null; unitdesc: string | null }>;

  isSpinnerVisible: { [key: string]: boolean } = {};

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

        if (res.api_status === true) {
          this.spinner.hide();

          this.unitName = res.data;
          console.log("unit Name", this.unitName);
          
          this.unitNameUpdated = this.unitName.map((unit: any, index: any) => ({
            id: unit.unit_id,
            name: unit.unit_name
          }));

          console.log("unit Name updated", this.unitNameUpdated);


          

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
        
      }
    );
  }

  tabChanged(event: any) {
    if (event === 1) {
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
    this.manageUnitDetails = [];
    this.showEventTable = false;
    this.common.UnitDetails().subscribe(
      (res) => {
        // console.log('log in111');

        if (res.api_status) {

          this.manageUnitDetails = res.data_value;
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
        Swal.fire('Deleting file cancelled', '', 'info');
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
    

    console.log("form data.", this.secondFormGroup.value,"lll", this.selectedBank1.id);
    

    if (this.secondFormGroup.valid) {
     
      this.params = this.secondFormGroup.value;

      const data = {unitname: this.secondFormGroup.value.unitname, unitdesc:  this.secondFormGroup.value.unitdesc, unitid: this.selectedBank1.id}

      console.log("data..",data);
      
      this.spinner.show();
      this.common.createUnit(data).subscribe(
        (res) => {
          
          this.unitNameLocalAdminfun();

          if (res.api_status) {
            this.spinner.hide();

            Swal.fire({
              icon: 'success',
              title: `${res.message}`,
            })
           
            this.spinner.hide();
          } else {
            this.spinner.hide();

            Swal.fire({
              icon: 'error',
              title: `${res.message}`,
            });
          }
        },
        (err) => {
          this.spinner.hide();

          this.common.apiErrorHandler(err);
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
