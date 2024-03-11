import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoserviceService {
  baseUrl: string = 'https://localhost:7159/api/Product';
  constructor(private http: HttpClient) {}
  // uploadPhoto(productId: number, file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post(`${this.baseUrl}/${productId}/photos/upload`, formData);
  // }

  uploadPhoto(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.baseUrl}/photos/upload`, formData);
  }
}
