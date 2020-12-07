import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<any> {
    const endpoint = 'http://localhost:8080/users/login';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
      .get( endpoint, { headers })
      .subscribe(response => {
        console.log(response);
      });
  }

  async register(email: string, password: string): Promise<any> {
    const endpoint = 'http://localhost:8080/users/create';
    const headers = { 'Content-Type': 'application/json' };
    const body = { username: email, password, role: 'COMMUNITY_MANAGER' };
    return await this.http
      .post<any>(endpoint, body, { headers })
      .toPromise();
  }
}
