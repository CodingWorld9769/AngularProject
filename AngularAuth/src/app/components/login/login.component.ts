import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, NgToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: NgToastService,
    private userStore: UserStoreService
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
}
