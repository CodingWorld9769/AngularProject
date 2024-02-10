import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';

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
  public fullName: string = '';
  public role: string = '';

  constructor(
    private auth: AuthService,

    private apiService: ApiService,

    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    //console.log("i'm in dashboard ngonit", localStorage.getItem('token'));
    this.apiService.getUser().subscribe((res) => {
      this.users = res;
    });

    //initialing the service here
    this.userStore.getFullNameFromStore().subscribe((val) => {
      //we can the name from auth service as well
      let fullNameFromToken = this.auth.getfullNameFromToken();
      //when we get the first time name it will be coming from the observble
      //but when we refresh the page observale will be empty and now  we will get the
      //fullname from the token
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((role) => {
      let roleFromToken = this.auth.getRoleFromToke();
      this.role = role || roleFromToken;
    });
  }

  logout() {
    this.auth.signOut();
  }
}
