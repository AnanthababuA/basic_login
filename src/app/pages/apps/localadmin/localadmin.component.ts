import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';

import Swal from 'sweetalert2';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-localadmin',
  templateUrl: './localadmin.component.html',
  styleUrls: ['./localadmin.component.scss']
})
export class LocaladminComponent  {
  passwordVisible: boolean = false;

  cpasswordVisible: boolean = false;



  secondFormGroup: FormGroup; // Ensure that you have defined the form group

  activeSection: string = 'localAdmin'; // Initial active section
  passwordmisatch1 : boolean 
  passwordmisatch : string = '10'
  loaderStatus: string = 'loading...';

  unitName: any
  unitType: any

  constructor(private fb: FormBuilder,   private common: CommonServicesService,private spinner: NgxSpinnerService) {
    this.secondFormGroup = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^.{0,10}$/) ]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
      password: ['', [Validators.required,  Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/) ]],
      cpassword: ['', Validators.required],
      unitid: ['', Validators.required],
      usertype: ['', Validators.required]
    }, {
      validator: this.matchPasswordValidator('password', 'cpassword')
    });
  }



  
  ngOnInit(): void {

    console.log("in ng init");
    
    this.unitNameLocalAdminfun()

    this.unitTypeLocalAdminfun()

  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Toggle password visibility

    console.log("print show password", this.passwordVisible);

  }

  togglecPasswordVisibility() {
    this.cpasswordVisible = !this.cpasswordVisible; // Toggle password visibility

    console.log("print show password", this.cpasswordVisible);

  }

  unitNameLocalAdminfun(){

    console.log();
    this.spinner.show()
    this.common.unitNameLocalAdmin().subscribe((res: any) => {

      console.log("in the unit name subscribe");
      
      
      if (res.api_status === true) {
        this.spinner.hide();

        this.unitName = res.data
        
        console.log("unit Name: ",  this.unitName);
      }else{
        this.spinner.hide();

        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        })

      }

    }, error => {
      this.spinner.hide();

      // this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---",error);
      

    })
  }


  unitTypeLocalAdminfun(){
    this.spinner.show();

    this.common.unitTypeLocalAdmin().subscribe((res: any) => {

      // this.spinner.hide();

      if (res.api_status === true) {
        this.spinner.hide();
        this.unitType = res.data
        
        console.log("unit type: ", this.unitType);
      }else{
        this.spinner.hide();

        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        })

      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---",error);
      

    })

  }
  




  matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        console.log("wront");
        this.passwordmisatch = '11'
        console.log(this.passwordmisatch);
        
        this.passwordmisatch1 = false
        this.secondFormGroup.get('cpassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: false };
        
      }
      console.log("match ");
      this.passwordmisatch = '10'
      this.passwordmisatch1 = true
      control.get('cpassword')?.setErrors(null);
      return { passwordMismatch: true };
    };
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  submit(action: string) {
    if (action === 'create') {
      console.log("Create Login clicked");


    
        // Both fields are filled; perform the submission
        // console.log('Submit data:', this.secondFormGroup.value);
        // this.params = this.secondFormGroup.value;
        // console.log('paramsss',this.params);
        this.spinner.show();
  
        this.common.createLocalAdmin(this.secondFormGroup.value).subscribe(
          (res) => {
            
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


    this.secondFormGroup.reset();

                  // Clear validation errors for each form control
                  Object.keys(this.secondFormGroup.controls).forEach(controlName => {
                    const control = this.secondFormGroup.get(controlName);
                    if (control) {
                      control.setErrors(null);
                    }
                  });
    
              // alert("OTP Generated Successfully\n"+ res.otp);
              // this.isPopupVisible = 1;
              // console.log('Form values:', this.generateOTPForm.value.callerName);
    
              // this.otpValue = res.otp;
            } else {
              console.log('message', res.message);
              this.spinner.hide();

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
    else if (action === 'update') {
      console.log("Update Login clicked");
    }

    
    console.log("Form value", this.secondFormGroup.value);

    // this.secondFormGroup.reset();
  }


  passwordsMatch(): boolean {
    const password = this.secondFormGroup.get('password')?.value;
    const cpassword = this.secondFormGroup.get('cpassword')?.value;
    return password === cpassword;
  }

  resetForm() {
    this.secondFormGroup.reset();
  }


}
