import { Component, OnInit } from '@angular/core';
import { Seller } from '../../models/Seller.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-seller',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgToastModule],
  templateUrl: './add-seller.component.html',
  styleUrl: './add-seller.component.css',
})
export class AddSellerComponent implements OnInit {
  seller: Seller[] = [];
  AddSellerForm!: FormGroup;
  brandName: string = 'Productify';
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: NgToastService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.AddSellerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      contactInformation: ['', Validators.required],
    });
  }
  logout() {
    this.auth.signOut();
  }

  onSubmit() {
    if (this.AddSellerForm.valid) {
      const formData = this.AddSellerForm.value;
      this.apiService.addSeller(formData).subscribe({
        next: (res) => {
          console.log('Seller added successfully', res);
          this.toastr.success({
            detail: 'Success',
            summary: 'Seller added successfully',
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
  }
}
