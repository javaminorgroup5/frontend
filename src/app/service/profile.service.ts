import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  async getProfile(id?: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    try {
      return await this.http
      .get(`http://localhost:8080/users/${id}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      })
      .toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  async updateProfile(id: number, profile: FormData): Promise<any> {
      const email = sessionStorage.getItem('email');
      const password = sessionStorage.getItem('password');
      const endpoint = `http://localhost:8080/users/${id}/profile`;
      const headers = {
          Authorization: 'Basic ' + btoa(`${email}:${password}`)
      };
      return await this.http
          .put(endpoint, profile, { headers } )
          .toPromise();
  }
}
