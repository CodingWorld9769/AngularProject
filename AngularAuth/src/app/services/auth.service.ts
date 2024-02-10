import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenApiModel } from '../models/token-api.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7159/api/User/';

  //decodeing payload
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    //initialize the payload here
    this.userPayload = this.decodedToken(); // decode method will send the payload data {role: user, fullname: John}
  }

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
    // console.log("I'm in store token", tokenValue);
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string) {
    //debugger;
    //console.log("I'm in store token", tokenValue);
    localStorage.setItem('refreshToken', tokenValue);
  }
  getToken() {
    // debugger;
    // console.log('Im inside getToken');
    //console.log(localStorage.getItem('token'));
    return localStorage.getItem('token'); //this all are singleton services i.e it can be called any time
  }
  getrefreshToken() {
    // debugger;
    // console.log('Im inside getToken');
    //console.log(localStorage.getItem('token'));
    return localStorage.getItem('refreshToken'); //this all are singleton services i.e it can be called any time
  }

  isLoggedIn(): boolean {
    // debugger;
    return !!localStorage.getItem('token');
  }

  //decode tokem
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!; // "!" becoz it is undefined
    //console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  //to get the user name and role from payload
  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.name;
  }

  getRoleFromToke() {
    if (this.userPayload) return this.userPayload.role;
  }

  renewToken(tokenApi: tokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }
}
