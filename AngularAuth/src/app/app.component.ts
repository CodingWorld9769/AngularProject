import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    RouterModule,
    NgToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'Pawan';

  constructor() {}
  ngOnInit(): void {}
}
