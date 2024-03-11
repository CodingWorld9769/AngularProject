import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';
import { Seller } from '../../models/Seller.model';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, NgToastModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  ListOfSeller: Seller[] = [];
  public fullName: string = '';
  public role: string = '';
  brandName: string = 'Productify';

  constructor(
    private auth: AuthService,

    private apiService: ApiService,

    private userStore: UserStoreService,
    private router: Router,
    private toastr: NgToastService
  ) {}

  ngOnInit(): void {
    //console.log("i'm in dashboard ngonit", localStorage.getItem('token'));
    this.apiService.getSeller().subscribe((res) => {
      this.ListOfSeller = res;
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

  onDelete(id: number) {
    this.apiService.deleteSeller(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success({
          detail: 'Success',
          summary: 'Seller deleted successfully',
          duration: 5000,
        });
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
  }

  

  logout() {
    this.auth.signOut();
  }
}
