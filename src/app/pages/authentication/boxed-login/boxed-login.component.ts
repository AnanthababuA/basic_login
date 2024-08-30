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
  captchaText: any;

  isSpinnerVisible: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private settings: CoreService, private router: Router, private auth: AuthService, private tokenStorage: TokenStorageService, private spinner: NgxSpinnerService,private common: CommonServicesService,) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // captcha: ['', Validators.required],

      
    })
  }

  ngOnInit(): void {

    localStorage.clear();

    this.auth.version().subscribe((data: any) => { 
      
      console.log("response data",data);

      this.spinner.hide();

      if (data.api_status === true) {

        this.versionNumber = data;

      }

    }, error => {

      this.spinner.hide();


      this.common.apiErrorHandler(error);
      // console.log("eerror---", error);


    })

    // this.captchaAPI();
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
    
    console.log("captcha text:", this.captchaText, "user enter: ", this.loginForm.value.captcha);

    // if (this.captchaText == this.loginForm.value.captcha) {

    //   console.log("valid captcha");
    //   this.spinner.show();

    

      if (this.loginForm.valid) {
  
        this.spinner.show();
        this.isSpinnerVisible['loginComponent'] = true;
  
        this.auth.login(this.loginForm.value).subscribe((res) => {
  
          this.isSpinnerVisible['loginComponent'] = false;
          if (res.api_status) {
            this.tokenStorage.saveToken(res.access);
            this.tokenStorage.saveRefreshToken(res.refresh);
            this.tokenStorage.saveUser(res);// set userType here for now user name set
            this.tokenStorage.saveUser(res.username);

            // this.dbs.storeValues(this.district,this.blockvalue,this.classvalues,this.startDat,this.endDat);

            this.tokenStorage.storeValues(res.udise_code, res.school_name, res.standard, res.Name, res.class_section)
  
            this.router.navigate(['/apps/home']);
           
            this.spinner.hide();
  
          } else {
            this.spinner.hide();
            this.isSpinnerVisible['loginComponent'] = false;
            this.loginError = 'Invalid Username Or Password';
          }
  
        })
  
      } else {
        this.spinner.hide();
        this.isSpinnerVisible['loginComponent'] = false;
  
      }
  
      
    // } else {
    //   // console.log("INvalid captcha");
    //   this.loginError = 'Invalid Captcha';
      
    // }
    

  
  }

  captchaAPI() {
    this.loginForm.get('captcha')?.setValue('');
    this.spinner.show();
    this.captchaUrl = '';
    this.captchaText = '';
    // this.auth.genCaptcha().subscribe(
    //   (res: any) => {
    //     if (res.api_status === true) {
    //       this.spinner.hide();
    //       this.captchaUrl = 'data:image/png;base64,' + res.image; // Update URL with base64 data
    //       this.captchaText =  res.captcha_text;
    //       console.log("Captcha URL:", this.captchaUrl); // Log captcha URL
    //       console.log("Captcha Text:", this.captchaText); // Log captcha text
    //     }
    //   },
    //   (error: any) => {
    //     console.error('Error occurred while generating captcha:', error);
    //   }
    // );
    this.auth.genCaptcha().subscribe(
      (res: any) => {
        if (res.api_status === true) {
          this.spinner.hide();
          // this.captchaUrl = res.captcha_img;
          this.captchaUrl = 'data:image/png;base64,' + res.captcha_img; // Update URL with base64 data
          this.captchaText =  res.captcha_text
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

  handleImageError() {
    console.error('Error loading captcha image.');
    // Handle error gracefully, e.g., display a placeholder image or show an error message.
  }
}

