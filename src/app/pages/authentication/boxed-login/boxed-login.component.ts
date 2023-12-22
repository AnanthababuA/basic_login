import { Component, ViewEncapsulation } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CommonServicesService } from 'src/app/services/common-services.service';



@Component({
  selector: 'app-boxed-login',
  templateUrl: './boxed-login.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class AppBoxedLoginComponent {
  passwordVisible: boolean = false;
  loginForm: FormGroup;

  versionNumber: any = '';

  loginError: string | null = null;

  loaderStatus: string = 'Loading...';
  options = this.settings.getOptions();

  captchaUrl: any;

  isSpinnerVisible: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private settings: CoreService, private router: Router, private auth: AuthService, private tokenStorage: TokenStorageService, private spinner: NgxSpinnerService,private common: CommonServicesService,) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],

      
    })
  }

  ngOnInit(): void {

    localStorage.clear();

    this.auth.getVersionNumber().subscribe((data: any) => {

    

      this.spinner.hide();

      if (data.api_status === true) {

        this.versionNumber = data

      }

    }, error => {

      this.spinner.hide();


      this.common.apiErrorHandler(error);
      console.log("eerror---", error);


    })

    this.captchaAPI()
  }


  get f() {
    return this.loginForm.controls;
  }

  ShowPassword(){
    // console.log("print show password", this.passwordVisible);
    
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Toggle password visibility

    // console.log("print show password", this.passwordVisible);

  }

  submit() {
    
    console.log("form value:", this.loginForm.value);
    

    this.spinner.show();

    

    if (this.loginForm.valid) {

      this.spinner.show();
      this.isSpinnerVisible['loginComponent'] = true;

      this.auth.login(this.loginForm.value).subscribe((res) => {

        this.isSpinnerVisible['loginComponent'] = false;
        if (res.api_status) {
         
          this.spinner.hide();


          this.tokenStorage.saveToken(res.access);
          this.tokenStorage.saveRefreshToken(res.refresh);
          this.tokenStorage.saveUserType(res.user_type); // set userType here for now user name set
          this.tokenStorage.saveUser(res.username);


          this.router.navigate(['/dashboards/dashboard']);
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Welcome to ISOC',
          //   text: `You have successfully logged-in.`,
          //   timer: 3000, 
          //   // showConfirmButton: false,
          // }).then(() => {
          //   // this.router.navigate(['dashboard']);
          // });
          

        } else {
          this.spinner.hide();
          this.isSpinnerVisible['loginComponent'] = false;
          // console.log("message", res.message);
          this.loginError = 'Invalid Username Or Password';
        }

      })

    } else {
      this.spinner.hide();
      this.isSpinnerVisible['loginComponent'] = false;

    }

  }

  captchaAPI() {
    this.spinner.show();
    this.captchaUrl = '';
    this.auth.genCaptcha().subscribe(
      (res: any) => {
        if (res.api_status === true) {
          this.spinner.hide();
          this.captchaUrl = res.captcha_img;
console.log("captch..", this.captchaUrl);

         
          
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
  refreshCaptcha(){
    console.log("refresh captcha");

    this.captchaAPI()
    
  }
}

