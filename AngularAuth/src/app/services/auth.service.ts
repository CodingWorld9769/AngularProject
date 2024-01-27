import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7159/api/User/';
  constructor(private http: HttpClient) {}

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}Register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}Authenticate`, loginObj);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token'); //this all are singleton services i.e it can be called any time
  }

  isLoggedIn(): boolean {
    //if there is token it will return true or else false
    return !!localStorage.getItem('token'); // "!!" this sign convert the string to boolean value
  }
}
