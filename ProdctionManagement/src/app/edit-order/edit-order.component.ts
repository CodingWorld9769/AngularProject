import { Component, OnInit } from '@angular/core';
import { order } from '../Model/Order.model';
import { Product } from '../Model/Product.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { EnviromentUrlsService } from '../shared/service/enviroment-urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css',
  providers: [DatePipe],
})
export class EditOrderComponent implements OnInit {
  newOrder: order = {
    orderId: 0,
    customerName: '',
    orderDate: new Date('2023-12-06'),
    quantity: 0,
    productId: 0,
  };
  products: Product[] = [];
  ordersForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: EnviromentUrlsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //retrive order id from the router parameter const idParam = this.route.snapshot.paramMap.get('id');
    const idParam = this.route.snapshot.paramMap.get('id');

    //check if idParam is not null and not undefined
    if (idParam != null && idParam != undefined) {
      const orderId = +idParam;

      //call the getorderById service
      this.orderService.getOrderById(orderId).subscribe((response: order) => {
        // Assuming response is a single order
        if (response) {
          this.newOrder = response;
          this.initForm();
          this.loadProduct();
        } else {
          console.error('Order not found.');
          // Handle the case where the order is not found
          // You might want to redirect to an error page or handle it differently
        }
      });
    } else {
      // Handle the case where 'id' is null or undefined
      console.error('Order ID is null or undefined.');
      // You might want to redirect to an error page or handle it differently
    }

    this.initForm();
    this.loadProduct();
  }

  initForm() {
    this.ordersForm = this.fb.group({
      customerName: [this.newOrder.customerName, Validators.required],
      orderDate: [
        this.formatDate(this.newOrder.orderDate),
        Validators.required,
      ],
      quantity: [
        this.newOrder.quantity,
        [Validators.required, Validators.min(1)],
      ],
      productId: [this.newOrder.productId, Validators.required],
    });

    console.log('Form Values:', this.ordersForm.value);
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

  //pipe for date
  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  onSubmit() {
    if (this.ordersForm.valid) {
      // Submit the form data to the server (you may want to call a service method)

      const formDate = this.ordersForm.value;
      // Update the newOrder object with the form data
      this.newOrder.customerName = formDate.customerName;
      this.newOrder.orderDate = formDate.orderDate;
      this.newOrder.quantity = formDate.quantity;
      this.newOrder.productId = formDate.productId;

      this.orderService
        .updateOrder(this.newOrder.orderId, this.newOrder)
        .subscribe((response) => {
          console.log('Order placed successfully!! ', response);
          this.router.navigate(['/Order']);
          this.showSuccessSnackbar('Order Updated successfully!');
        });
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
