import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private selectedProductSource = new BehaviorSubject<Product>({
    productId: null,
    productName: '',
    productDescription: '',
    price: 0,
    sellerId: 0,
    sellerName: '',
    imageUrl: '',
  });
  setSelectedProduct$ = this.selectedProductSource.asObservable();

  constructor() {}
  setSelectedProduct(product: Product) {
    this.selectedProductSource.next(product);
  }
}
