import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/Product.model';
import { FormsModule } from '@angular/forms';
import { EnviromentUrlsService } from '../shared/service/enviroment-urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  editProduct: Product = {
    productName: '',
    price: 0,
    quantity: 0,
    productId: 0,
    category: 0,
    isAvailable: false,
  };
  constructor(
    private service: EnviromentUrlsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the product ID from the route parameters
    const idParam = this.route.snapshot.paramMap.get('id');

    // Check if idParam is not null or undefined before converting to a number
    if (idParam !== null && idParam !== undefined) {
      const productId = +idParam;

      // Call the service method to get the product by ID
      this.service.getProductById(productId).subscribe((data) => {
        console.log(data);
        this.editProduct = data;
      });
    } else {
      // Handle the case where 'id' is null or undefined
      console.error('Product ID is null or undefined.');
      // You might want to redirect to an error page or handle it differently
    }
  }

  onSubmit() {
    this.service
      .upDateProduct(this.editProduct.productId, this.editProduct)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/Product']);
      });
  }
}
