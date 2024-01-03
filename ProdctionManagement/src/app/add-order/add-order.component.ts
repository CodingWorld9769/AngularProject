import { Component, OnInit } from '@angular/core';
import { order } from '../Model/Order.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnviromentUrlsService } from '../shared/service/enviroment-urls.service';
import { Router } from '@angular/router';
import { Product } from '../Model/Product.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent implements OnInit {
  newOrder: order[] = [];
  products: Product[] = [];
  ordersForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: EnviromentUrlsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProduct();
  }

  initForm() {
    this.ordersForm = this.fb.group({
      customerName: ['', Validators.required],
      orderDate: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      productId: ['', Validators.required],
    });
  }

  loadProduct() {
    // Assuming productService.getProducts() returns an Observable
    this.orderService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSubmit() {
    if (this.ordersForm.valid) {
      // Submit the form data to the server (you may want to call a service method)
      const formDate = this.ordersForm.value;
      this.orderService.AddOrder(formDate).subscribe(
        (response) => {
          console.log('Order placed successfully!! ', response);
          this.router.navigate(['/Order']);
          this.showSuccessSnackbar('Order placed successfully!');
        },
        (error) => {
          console.error('Error placing order:', error);
          this.showErrorSnackbar('Error placing order. Please try again.');
        }
      );
    }
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: 'success-snackbar', // Add a custom CSS class for styling
    });
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      panelClass: 'error-snackbar', // Add a custom CSS class for styling
    });
  }
}
