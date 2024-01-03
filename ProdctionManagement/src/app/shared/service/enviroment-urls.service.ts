import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment.production';
import { Product } from '../../Model/Product.model';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { order } from '../../Model/Order.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class EnviromentUrlsService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'https://localhost:7190';
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.apiUrl + '/api/Controller/GetProducts'
    );
  }
  //CRUD service for Product
  getProductById(productId: number): Observable<Product> {
    const getProductUrl = `${this.apiUrl}/api/Controller/GetProduct/${productId}`;
    return this.http.get<Product>(getProductUrl);
  }
  addProduct(product: Product): Observable<Product[]> {
    // Adjust the API endpoint based on your actual API
    const addProductUrl = `${this.apiUrl}/api/Controller/AddProduct`;
    return this.http.post<Product[]>(addProductUrl, product);
  }

  upDateProduct(id: number, product: Product): Observable<Product[]> {
    const upDateProduct = `${this.apiUrl}/api/Controller/Updateproduct/${id}`;
    return this.http.put<Product[]>(upDateProduct, product);
  }

  deleteProduct(id: number): Observable<any> {
    const deleteProductUrl = `${this.apiUrl}/api/Controller/DeleteProduct/${id}`;
    return this.http.delete(deleteProductUrl);
  }

  //CRUDService for Order
  getAllOrders(): Observable<order[]> {
    return this.http.get<order[]>(`${this.apiUrl}/api/Controller/GetOrder`);
  }

  getOrderById(orderId: number): Observable<order> {
    return this.http.get<order>(
      `${this.apiUrl}/api/Controller/GetOrderbyId/${orderId}`
    );
  }

  AddOrder(order: order): Observable<order[]> {
    const addOrderUrl = `${this.apiUrl}/api/Controller/AddOrder`;
    return this.http.post<order[]>(addOrderUrl, order);
  }

  updateOrder(id: number, order: order): Observable<order[]> {
    const updateOrderUrl = `${this.apiUrl}/api/Controller/updateOrder/${id}`;
    return this.http.put<order[]>(updateOrderUrl, order);
  }

  deleteOrder(id: number) {
    const deleteOrder = `${this.apiUrl}/api/Controller/DeleteOrder/${id}`;
    return this.http.delete(deleteOrder);
  }
}
