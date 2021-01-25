import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  async getAllUsers(): Promise<any> {
    const endpoint = `/users`;
    return this.baseService.getApiCall(endpoint);
  }
}
