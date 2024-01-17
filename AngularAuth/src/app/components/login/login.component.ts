import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor() {}
  ngOnInit(): void {}
  hideAndShowPass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }
}
