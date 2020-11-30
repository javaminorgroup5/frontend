import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<any> {
    return await this.http
      .get('http://localhost:8080/users/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
  }

  async register(
    username: string,
    password: string,
    profileName: string,
    profilePicture: string
  ): Promise<any> {
    const body = JSON.stringify({
      username,
      password,
      role: 'USER',
      profile: { profileName, profilePicture },
    });
    return await this.http
      .post('http://localhost:8080/users/create', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .toPromise();
  }
}
