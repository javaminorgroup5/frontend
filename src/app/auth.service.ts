import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './recipe/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<any> {
    const endpoint = 'http://localhost:8080/users/login';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`),
    };
    return await this.http
      .get<number>(endpoint, { headers })
      .toPromise();
  }

  async register(user: FormData): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = 'http://localhost:8080/users/create';
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };

    try {
      return await this.http
        .post<User>(endpoint, user, { headers })
        .toPromise();
    } catch (error) {
      console.error(error);
    }
  }
}
