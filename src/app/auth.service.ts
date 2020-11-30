import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient;

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  login(): void {
    this.httpClient.get('http://localhost:8080/users');
  }

  register(): void {}
}
