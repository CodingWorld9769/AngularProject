import { Component, OnInit } from '@angular/core';
import {
  RouteReuseStrategy,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Product } from '../Model/Product.model';
import { ProductCategory } from '../Model/ProductCategory.enum';
import { EnviromentUrlsService } from '../shared/service/enviroment-urls.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports: [
    HttpClientModule,
    AddProductComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class ProductComponent implements OnInit {
  listOfProduct: Product[] = [];

  constructor(
    private services: EnviromentUrlsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //call get All product API to print the list
    this.services.getAllProducts().subscribe((data) => {
      this.listOfProduct = data;
      console.log(this.listOfProduct);
    });
  }

  deleteProduct(productId: number): void {
    this.services.deleteProduct(productId).subscribe((response) => {
      console.log(`Product with ID ${productId} deleted. Response:`, response);

      // Remove the deleted product from the local array
      this.listOfProduct = this.listOfProduct.filter(
        (product) => product.productId !== productId
      );
    });
  }

  // mapping category with enum and return string
  mapCategoryFromValue(categoryValue: number): string {
    switch (categoryValue) {
      case ProductCategory.Electronics:
        return 'Electronics';
      case ProductCategory.Clothing:
        return 'Clothing';
      case ProductCategory.Furniture:
        return 'Furniture';
      case ProductCategory.Books:
        return 'Books';
      default:
        return 'Unknown';
    }
  }
}
