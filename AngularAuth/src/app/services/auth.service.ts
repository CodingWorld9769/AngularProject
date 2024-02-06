import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7159/api/User/';
  constructor(private http: HttpClient, private router: Router) {}

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}Register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}Authenticate`, loginObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  //when ever our login is success we will use this method
  storeToken(tokenValue: string) {
    // console.log('Hii');
    // console.log(tokenValue);
    debugger;
    console.log("I'm in store token", tokenValue);
    localStorage.setItem('token', tokenValue);
  }
  // storeToken(tokenValue: string): Promise<void> {
  //   return new Promise<void>((resolve) => {
  //     localStorage.setItem('token', tokenValue);
  //     resolve();
  //   });
  // }

  getToken() {
    // debugger;
    // console.log('Im inside getToken');
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token'); //this all are singleton services i.e it can be called any time
  }

  isLoggedIn(): boolean {
    debugger;
    return !!localStorage.getItem('token');
  }
}
