import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private baseService: BaseService) { }

  async getProfile(id?: number): Promise<any> {
    const endpoint = `/users/${id}/profile`;
    return this.baseService.getApiCall(endpoint);
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
