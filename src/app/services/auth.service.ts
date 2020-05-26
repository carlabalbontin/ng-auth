import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map(response => {
        const result = response.json();
        if(result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired(); // replaces the next code

    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');

    // if(!token) {
    //   return false;
    // } else {
    //   let expirationDate = jwtHelper.getTokenExpirationDate(token);
    //   let isExpired = jwtHelper.isTokenExpired(token);

    //   return !isExpired;
    // }
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      return new JwtHelper().decodeToken(token);
    }
  }
}

