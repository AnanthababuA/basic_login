 import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-localadmin',
  templateUrl: './localadmin.component.html',
  styleUrls: ['./localadmin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocaladminComponent {


  unitNameUpdated: any = [];
  unitTypeUpdated: any = [];

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
      this.secondFormGroup.value.usertype =  this.selectedBank2.id;
      console.log("form data..2",this.secondFormGroup.value);


    } else if (selectNumber === 3) {
      this.selectedBank3 = bank;
    }
  }
  // @ViewChild(SelectSearchComponent) selectSearch!: SelectSearchComponent; // ViewChild reference




  passwordVisible: boolean = false;
  cpasswordVisible: boolean = false;
  secondFormGroup: FormGroup;
  unitName: any;
  unitType: any;


  // search select 
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  // options: any
  filteredOptions: any;

  options: any[] = [];

  constructor(
    private fb: FormBuilder,
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
  ) {

    // select filter 
    this.filteredOptions = this.options.slice();



    this.secondFormGroup = this.fb.group({
      username: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/)],
      ],
      cpassword: ['', Validators.required],
      unitid: [''],
      usertype: [''],
    }, 
    {
      validator: this.matchPasswordValidator('password', 'cpassword')
    }
    );
  }

  // select filter 
  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(
      (o: any) => o.unit_name.toLowerCase().includes(filterValue)
    );
  }
  

  ngOnInit(): void {
    this.options = [];
    this.unitNameLocalAdminfun();
    this.unitTypeLocalAdminfun();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglecPasswordVisibility() {
    this.cpasswordVisible = !this.cpasswordVisible;
  }

  unitNameLocalAdminfun() {
    this.spinner.show();
    this.unitName = '';
    this.common.unitNameLocalAdmin().subscribe((res: any) => {
      if (res.api_status === true) {
        this.spinner.hide();
        this.unitName = res.data;
        this.options = res.data

        this.unitNameUpdated = this.unitName.map((unit: any, index: any) => ({
          id: unit.unit_id,
          name: unit.unit_name
        }));


      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        });
      }
    }, error => {
      this.spinner.hide();
      console.log("Error: ", error);
    });
  }

  unitTypeLocalAdminfun() {
    this.spinner.show();
    this.unitType = '';
    this.common.unitTypeLocalAdmin().subscribe((res: any) => {
      if (res.api_status === true) {
        this.spinner.hide();
        this.unitType = res.data;

        console.log("unit type", this.unitType);
        

        this.unitTypeUpdated = this.unitType.map((unit: any, index: any) => ({
          id: unit.name,
          name: unit.name
        }));


      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        });
      }
    }, error => {
      this.spinner.hide();
      console.log("Error: ", error);
    });
  }

  matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);
  
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        control.get('cpassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
  
      control.get('cpassword')?.setErrors(null);
      return null; // Return null if there's no error
    };
  }
  

  submit(action: string) {
    if (action === 'create') {
      console.log("form values.. in submit", this.secondFormGroup.value, "dfd",  this.selectedBank2.id);

      const data = { username: this.secondFormGroup.value.username, email: this.secondFormGroup.value.email, password: this.secondFormGroup.value.password, cpassword: this.secondFormGroup.value.cpassword, unitid: this.selectedBank1.id, usertype: this.selectedBank2.id}
      
      this.spinner.show();
      this.common.createLocalAdmin(data).subscribe(
        (res) => {
          if (res.api_status) {
            this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: `${res.message}`,
            }).then(() => {
              // this.secondFormGroup.reset();
            });
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
          console.log('Error: ', err);
        }
      );

      this.resetForm();


    }
  }

  resetForm() {
    this.secondFormGroup.reset();

        // Clear validation errors for each form control
        Object.keys(this.secondFormGroup.controls).forEach(controlName => {
          const control = this.secondFormGroup.get(controlName);
          if (control) {
            control.setErrors(null);
          }
        });
  }
}

