import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';


interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-generateotp',
  templateUrl: './generateotp.component.html',
  styleUrls: ['./generateotp.component.scss']
})
export class GenerateotpComponent {


  genOtpForm: FormGroup;
  params: any;
  loaderStatus: string = 'Loading...';


  constructor(private fb: FormBuilder, private auth: AuthService,private spinner: NgxSpinnerService) {

    this.genOtpForm = this.fb.group({
      // user_name: ['', Validators.required],
      user_name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s]*$/) // Allow only letters (uppercase and lowercase) and numbers
      ]],
      contact_number: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      // contact_number: ['', Validators.required],
      // designation: ['', Validators.required],
      designation: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{5,20}$/)
      ]],
      // rank: ['', Validators.required]
      rank: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{3,20}$/) //min 3 max 20
      ]],
    })

  }





  submit() {

    this.spinner.show();

    this.auth.genOtpService(this.genOtpForm.value).subscribe(
      (res) => {
        // this.spinner.hide();

        console.log('log in111');

        if (res.api_status) {
          console.log('otp', res);
        this.spinner.hide();

          Swal.fire({
            icon: 'success',
            title: `OTP: ${res.otp}`,
            html: `OTP Generated Successful `,

            // text: `OTP is: ${res.otp}.  <br> \r\nuser name is`,
            // timer: 3000, 
            // showConfirmButton: false,
          }).then(() => {
            // this.router.navigate(['dashboard']);
          });


          // alert("OTP Generated Successfully\n"+ res.otp);
          // this.isPopupVisible = 1;
          // console.log('Form values:', this.generateOTPForm.value.callerName);

          // this.otpValue = res.otp;
        } else {
      this.spinner.hide();

          console.log('message', res.message);

          Swal.fire({
            icon: 'error',
            title: ` ${res.message}`,
            // html: `OTP Generated Successful `,

            // text: `OTP is: ${res.otp}.  <br> \r\nuser name is`,
            // timer: 3000, 
            // showConfirmButton: false,
          })
        }
      },
      (err) => {
      this.spinner.hide();

        console.log('unable to log in', err);
        // this.common.apiErrorHandler(err);
      }
    );
    


    this.genOtpForm.reset();



    // Clear validation errors for each form control
    Object.keys(this.genOtpForm.controls).forEach(controlName => {
      const control = this.genOtpForm.get(controlName);
      if (control) {
        control.setErrors(null);
      }
    });



  }

}