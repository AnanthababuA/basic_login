import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  //   styleUrls: ['./last-communi-alertpop.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,

  imports: [
    DataTablesModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    TablerIconsModule,
  ],
})
export class ChangePasswordComponent {
  passwordVisible: boolean = false;
  cpasswordVisible: boolean = false;
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/),
          ],
        ],
        cpassword: ['', Validators.required],
      },
      {
        validator: this.matchPasswordValidator('password', 'cpassword'),
      }
    );
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglecPasswordVisibility() {
    this.cpasswordVisible = !this.cpasswordVisible;
  }

  matchPasswordValidator(
    passwordKey: string,
    confirmPasswordKey: string
  ): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);

      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        control.get('cpassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      control.get('cpassword')?.setErrors(null);
      return null; // Return null if there's no error
    };
  }

  submit() {
    console.log('form data..', this.changePasswordForm.value);

    const data = {
      old_password: this.changePasswordForm.value.oldPassword,
      new_password: this.changePasswordForm.value.password,
      re_new_password: this.changePasswordForm.value.password,
    };

    console.log('payload', data);

    this.changePasswordApi(data);
  }

  resetForm() {
    this.changePasswordForm.reset();

    // Clear validation errors for each form control
    Object.keys(this.changePasswordForm.controls).forEach((controlName) => {
      const control = this.changePasswordForm.get(controlName);
      if (control) {
        control.setErrors(null);
      }
    });
  }

  changePasswordApi(data: any) {
    this.common.changeUserPassword(data).subscribe(
      (res) => {
        if (res.api_status) {
          console.log('success changed');

          //   this.openDialogChangePass()
          Swal.fire({
            icon: 'success',
            title: `${res.message}`,
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              // this.openDialogChangePass()
              this.dialogRef.close();

              console.log('User clicked OK or closed the modal');
              this.router.navigate(['/authentication/login']);
              // Add your code here to execute after the user clicks OK or closes the modal
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (err) => {
        console.log('Error: ', err);
      }
    );

    this.resetForm();
  }

  //   openDialogChangePass() {
  //     const dialogRef: MatDialogRef<ChangePasswordComponent> = this.dialog.open(ChangePasswordComponent);

  //     // Close the dialog box without passing any data
  //     dialogRef.close();
  //   }
}
