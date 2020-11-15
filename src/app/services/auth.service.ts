import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token !== null;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
}
