import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/Product.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Seller } from '../../../models/Seller.model';
import { ApiService } from '../../../services/api.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { PhotoserviceService } from '../../../services/photoservice.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgToastModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  listOfProduct: Product[] = [];
  listOfSeller: Seller[] = [];
  productForm!: FormGroup;
  selectedFile!: File;
  brandName: string = 'Productify';

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: NgToastService,
    private router: Router,
    private photoService: PhotoserviceService
  ) {}

  ngOnInit(): void {
    //debugger;
    this.productForm = this.fb.group({
      // productId: ['', Validators.required], // Remove productId
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      price: ['', Validators.required],
      sellerId: ['', Validators.required], // Add seller form control
      // photoFile: [null], // New form control for storing selected photo file
    });

    this.api.getSeller().subscribe({
      next: (res) => {
        this.listOfSeller = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: any) {
    // debugger;
    console.log('Hello');
    //  const files = <File>event.target.files;
    this.selectedFile = <File>event.target.files[0];

    console.log(this.selectedFile);
  }
  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('productName', this.productForm.value.productName);
      formData.append(
        'productDescription',
        this.productForm.value.productDescription
      );
      formData.append('price', this.productForm.value.price);
      formData.append('sellerId', this.productForm.value.sellerId);
      if (this.selectedFile) {
        formData.append('photoFile', this.selectedFile);
      }

      this.api.addProduct(formData).subscribe({
        next: (res) => {
          console.log(res);

          this.toastr.success({
            detail: 'Success',
            summary: 'Seller Add successfully',
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
        },
      });
    }
  }
  logout() {
    this.auth.signOut();
  }
}
