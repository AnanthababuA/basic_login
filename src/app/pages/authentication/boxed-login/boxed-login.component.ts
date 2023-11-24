import { Component, ViewEncapsulation } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';



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



  constructor(private fb: FormBuilder, private settings: CoreService, private router: Router, private auth: AuthService, private tokenStorage: TokenStorageService, private spinner: NgxSpinnerService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // captcha:  ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.auth.getVersionNumber().subscribe((data: any) => {

      this.spinner.hide();

      if (data.api_status === true) {

        this.versionNumber = data

      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })
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
    // console.log(this.form.value);
    // this.router.navigate(['/dashboards/dashboard1']);

    // console.log("spinner show..");
    

    this.spinner.show();

    // Use setTimeout to give the spinner time to render
    // setTimeout(() => {
    //   console.log("spinner hide..");
    //   this.spinner.hide();
    // }, 0);


    // console.log("spinner hide..");


    // console.log(this.loginForm.value)

    if (this.loginForm.valid) {

      this.spinner.show();

      this.auth.login(this.loginForm.value).subscribe((res) => {
        // console.log("log in111");

        if (res.api_status) {
          // console.log("log in", res);
          // console.log("res.access: ",res.access);
          // console.log("res.refresh: ", res.refresh);
          // console.log("res.username:55555555 ", res.username);

          this.spinner.hide();


          this.tokenStorage.saveToken(res.access);
          this.tokenStorage.saveRefreshToken(res.refresh);
          this.tokenStorage.saveUserType(res.user_type); // set userType here for now user name set
          this.tokenStorage.saveUser(res.username);



          // console.log("res.refresh: ", res.user_type);


          // this.router.navigate(['dashboard']);

          // setTimeout(() => {
          //   this.router.navigate(['/dashboards/dashboard1']);
          // }, 2000); 

          this.router.navigate(['/dashboards/dashboard']);
          // this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Welcome to ISOC',
            text: `You have successfully logged-in.`,
            timer: 3000, 
            // showConfirmButton: false,
          }).then(() => {
            // this.router.navigate(['dashboard']);
          });
          

        } else {
          this.spinner.hide();
          // console.log("message", res.message);
          this.loginError = 'Invalid login Username or password.';
        }

      })

    } else {
      this.spinner.hide();

      // console.log("invalid form");

    }

  }

}

