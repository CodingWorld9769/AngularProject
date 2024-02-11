import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';
import { CommonModule } from '@angular/common';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  loginForm!: FormGroup;

  public resetPasswordEmail: string = '';
  public isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: NgToastService,
    private userStore: UserStoreService,
    private resetPasswordService: ResetPasswordService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  hideAndShowPass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken); //it will store the token when login is successful
          this.auth.storeRefreshToken(res.refreshToken); // storing the refresh token

          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name); //set the fullname
          this.userStore.setRoleForStore(tokenPayload.role); // set the role of the user

          this.toastr.success({
            detail: 'Success',
            summary: res.message,
            duration: 5000,
          });
          debugger;

          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toastr.error({
            detail: 'Error',
            summary: 'Something went wrong',
            duration: 5000,
          });
          console.log(err);
          //this.toastr.warning('Login failed');
        },
      });
    } else {
      //throw error
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    //rejex pattern to check email
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);

      //API call to be done

      this.resetPasswordService
        .sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (res) => {
            this.toastr.success({
              detail: 'Success',
              summary: 'Reset Done',
              duration: 3000,
            });
            this.resetPasswordEmail = '';
            const buttonRef = document.getElementById('closBtn');
            buttonRef?.click(); // form will be closed when close button is hit
          },
          error: (err) => {
            this.toastr.error({
              detail: 'Error',
              summary: 'Something went wrong',
              duration: 5000,
            });
          },
        });
    }
  }
}
