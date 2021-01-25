import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Recipe} from '../model/recipe';
import {GroupCategory} from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = 'http://localhost:8080/category';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
      .get<[]>(endpoint, { headers }).toPromise();
  }

  async addCategory(category: GroupCategory): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/admin/category`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
        .post<Recipe>(endpoint, category, { headers })
        .toPromise();
  }

  async getCategory(categoryId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/admin/category/${categoryId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
        .get<Recipe>(endpoint, {headers})
        .toPromise();
  }

  async editCategory(category: GroupCategory, categoryId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/admin/category/${categoryId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
        .put<Recipe>(endpoint, category, {headers})
        .toPromise();
  }
}
