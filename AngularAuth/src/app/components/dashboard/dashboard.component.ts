import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  /**
   *
   */
  public users: any = [];
  constructor(
    private auth: AuthService,

    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    console.log("i'm in dashboard ngonit", localStorage.getItem('token'));
    this.apiService.getUser().subscribe((res) => {
      this.users = res;
    });
  }

  logout() {
    this.auth.signOut();
  }
}
