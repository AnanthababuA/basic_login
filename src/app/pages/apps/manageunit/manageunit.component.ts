import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  dummyData: any[] = [];

  loaderStatus: string = 'Loading...';


  showEventTable: boolean = false;

  manageUnitDetails: any[] = [];
  unitName: any
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });


  secondFormGroup = this._formBuilder.group({
    unitname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{0,10}$/)]],
    unitdesc: ['', [Validators.required, Validators.pattern(/^[\s\S]{0,200}$/)]],
    unitid: ['', Validators.required],
  });

  //   constructor(private _formBuilder: FormBuilder) {}
  // }

  displayedColumns = ['id', 'name', 'progress', 'color', 'color2'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  params: Partial<{ unitname: string | null; unitdesc: string | null; }>;

  constructor(breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder, private common: CommonServicesService, private spinner: NgxSpinnerService) {
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


    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 10,
    //     processing: true,
    //     dom: 'lBfrtip',
    //   buttons: [
    //     'copy', 'excel', 'pdf','pdfHtml5'
    // ],

    //   };

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'lBfrtip',

      initComplete: function () {
        $('.button').removeClass('dt-button');
      },
      buttons: [

        {
          extend: 'copy',
          text: '<i class="mdi mdi-content-copy"></i> Copy',
          className: 'bg-success rounded btn-sm btn btn-warning m-x-6 text-dark',

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

  

    
    for (let i = 1; i <= 20; i++) {
      this.dummyData.push({
        id: i,
        firstName: `First Name ${i}`,
        lastName: `Last Name ${i}`,
      });
    }


    console.log("in ng init");

    this.unitNameLocalAdminfun()

    // this.unitTypeLocalAdminfun()

      // Initialize editMode array with 'false' for each row initially
  this.editMode = new Array(this.manageUnitDetails.length).fill(false);

  }


  unitNameLocalAdminfun() {

    console.log();
this.spinner.show()
    this.common.unitNameLocalAdmin().subscribe((res: any) => {

      console.log("in the unit name subscribe");

      
      if (res.api_status === true) {
        this.spinner.hide();

        this.unitName = res.data

        console.log("unit Name: ", this.unitName);
        this.spinner.hide();

      } else {

        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        })
      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })
  }

  tabChanged(event: any) {
    console.log("tab changed", event);
    if (event === 1) {
      console.log("mange unit call");
      this.showEventTable = false;

      this.spinner.show
      this.common.UnitDetails().subscribe(
        (res) => {
          
          console.log('log in111');
          
          if (res.api_status) {
            this.spinner.hide();
            this.manageUnitDetails = res.data_value
            console.log('manage unit details', this.manageUnitDetails);
            // Swal.fire({
            //   icon: 'success',
            //   title: `${res.message}`,



            // }).then(() => {
            //   // this.router.navigate(['dashboard']);
            // });


            // alert("OTP Generated Successfully\n"+ res.otp);
            // this.isPopupVisible = 1;
            // console.log('Form values:', this.generateOTPForm.value.callerName);

            // this.otpValue = res.otp;

            this.showEventTable = true;
          } else {
            this.spinner.hide();

            this.showEventTable = true;

            console.log('message', res.message);

            Swal.fire({
              icon: 'error',
              title: `${res.message}`,



            })
          }
        },
        (err) => {
          this.spinner.hide();

          console.log('unable to log in', err);
          // this.common.apiErrorHandler(err);
        }
      );



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

  // Inside your component class
editMode: boolean[] = []; // To toggle between view and edit mode for each row

editRow(index: number) {
  // Toggle the edit mode for the selected row
  this.editMode[index] = !this.editMode[index];
}

// ngOnInit(): void {
//   // Assuming manageUnitDetails is populated with data

//   // Initialize editMode array with 'false' for each row initially
//   this.editMode = new Array(this.manageUnitDetails.length).fill(false);
// }

// Create a method to save changes when 'Save' is clicked
saveChanges(index: number) {
  // Save changes made to the row here, for example:
  console.log('Updated Unit Name:', this.manageUnitDetails[index].unit_name);
  console.log('Updated Unit Desc:', this.manageUnitDetails[index].unit_desc);

  // Toggle back to view mode after saving changes
  this.editMode[index] = false;
}
deleteRow(index: number) {
  // Implement the logic to delete the row using the provided index
  // For example:
  this.manageUnitDetails.splice(index, 1);
  // Additional logic for deleting the row...

  // Ensure to update other necessary data or perform delete operations here
}


// before 
  // editRow() {
  //   console.log("edit row");

  // }

  // deleteRow() {
  //   console.log("delete row");

  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submit() {
    console.log('submit')
    console.log('secondform====', this.secondFormGroup)


    // const unitnameValue = this.secondFormGroup?.get('unitname')?.value;
    // const unitdescValue = this.secondFormGroup?.get('unitdesc')?.value;

    // console.log('unitname:', unitnameValue);
    // console.log('unitdesc:', unitdescValue);

    if (this.secondFormGroup.valid) {
      // Both fields are filled; perform the submission
      console.log('Submit data:', this.secondFormGroup.value);
      this.params = this.secondFormGroup.value;
      console.log('paramsss', this.params);

      this.spinner.show()
      this.common.createUnit(this.secondFormGroup.value).subscribe(
        (res) => {
          // this.spinner.hide();

          console.log('log in111');

          if (res.api_status) {
          this.spinner.hide();

            console.log('otp', res);

            Swal.fire({
              icon: 'success',
              title: `${res.message}`,



            }).then(() => {
              // this.router.navigate(['dashboard']);
            });


            // alert("OTP Generated Successfully\n"+ res.otp);
            // this.isPopupVisible = 1;
            // console.log('Form values:', this.generateOTPForm.value.callerName);

            // this.otpValue = res.otp;
            this.spinner.hide();

          } else {
          this.spinner.hide();

                      Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          })
            console.log('message', res.message);
          }
        },
        (err) => {
          this.spinner.hide();

          console.log('unable to log in', err);
          // this.common.apiErrorHandler(err);
        }
      );


      this.secondFormGroup.reset();

      // Clear validation errors for each form control
      Object.keys(this.secondFormGroup.controls).forEach(controlName => {
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

}




export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
  color2: string;
}


