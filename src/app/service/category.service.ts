import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  async getCategories(): Promise<any> {
    return this.baseService.getApiCall('/category');
  }
}
