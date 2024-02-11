import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../../models/resetPassword.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../helper/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'), // Corrected 'confirmpassword' to 'confirmPassword'
      }
    );

    this.activatedRoute.queryParams.subscribe((val) => {
      this.emailToReset = val['email']; //token is email
      //if there is any  space we will replace it with text
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
      // console.log(this.emailToken);
      // console.log(this.emailToReset);
    });
  }

  reset() {
    if (this.resetPasswordForm.valid) {
      //set the value of the field created above
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword =
        this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      //call the api  here
      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Password Reset Successfully',
            duration: 3000,
          });
          //when the password is reset go to login
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Password Reset UnSuccessfully',
            duration: 3000,
          });
        },
      });
    } else {
      // ValidateFrom.validateAllFormFields(this.resetPasswordForm);
    }
  }
}
