import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../models/Seller.model';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrlSeller: string = 'https://localhost:7159/api/Seller';
  private baseUrlUser: string = 'https://localhost:7159/api/User';
  private baseUrlProduct: string = 'https://localhost:7159/api/Product';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<any>(`${this.baseUrlUser}/GetUsers`);
  }
  getUserIdByUserName(userName:string){
    return this.http.get(`${this.baseUrlUser}/${userName}`)

  }
  getSeller() {
    return this.http.get<any>(`${this.baseUrlSeller}/GetSeller`);
  }

  addSeller(seller: Seller): Observable<Seller> {
    return this.http.post<Seller>(`${this.baseUrlSeller}/AddSeller`, seller);
  }

  deleteSeller(id: number) {
    return this.http.delete(`${this.baseUrlSeller}/DeleteSeller/${id}`);
  }

  getSellerById(id: number): Observable<Seller> {
    return this.http.get<Seller>(`${this.baseUrlSeller}/GetSeller/${id}`);
  }
  updateSeller(id: number, seller: Seller): Observable<Seller[]> {
    return this.http.put<Seller[]>(
      `${this.baseUrlSeller}/updateSeller/${id}`,
      seller
    );
  }

  //Service for Products

  getProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrlProduct}/GetProducts/${id}`);
  }

  addProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(
      `${this.baseUrlProduct}/AddProduct`,
      product
    );
  }
}
