import { Component, OnInit } from '@angular/core';
import { Product } from '../Model/Product.model';
import { FormsModule } from '@angular/forms';
import { EnviromentUrlsService } from '../shared/service/enviroment-urls.service';
import { Route, Router } from '@angular/router';
import { ProductCategory } from '../Model/ProductCategory.enum';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  addProduct: Product = {
    productName: '',
    price: 0,
    quantity: 0,
    productId: 0,
    category: 0,
    isAvailable: false,
  };

  //inject the service inside constructor
  constructor(private service: EnviromentUrlsService, private router: Router) {}

  ngOnInit(): void {}

  OnSubmit() {
    this.service.addProduct(this.addProduct).subscribe((response) => {
      console.log('Product added successfully:', response);
      // Redirect to the '/Product' route after successful addition
      this.router.navigate(['/Product']);
    });
  }
}
