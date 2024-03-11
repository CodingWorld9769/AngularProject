import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/Review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl:string = 'https://localhost:7159/';
  constructor(private http: HttpClient) { }

  getReviews(id:any):Observable<Review[]>{
    return this.http.get<Review[]>(`${this.baseUrl}GetReviews/${id}`);
  }

  addReview(review: Review): Observable<any> {
    return this.http.post(`${this.baseUrl}AddReview`,review); // Assuming 'reviews' is the endpoint for adding reviews
  }



}
