import { HttpClient } from '@angular/common/http';
import { R3ResolvedDependencyType } from '@angular/compiler';
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

  async updateProfile(profileName: string, profilePicture: string): Promise<any> {
    {
      const email = sessionStorage.getItem('email');
      const password = sessionStorage.getItem('password');
      const id = sessionStorage.getItem('userId');
      const body = JSON.stringify({
        profileName, profilePicture
      });
      return await this.http
        .put(`http://localhost:8080/users/${id}/profile`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${email}:${password}`),
          },
        })
        .toPromise();
    }
  }
}
