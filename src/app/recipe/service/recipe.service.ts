import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  userId = '';

  constructor(private http: HttpClient) {}

  async addRecipe(id: number, recipe: Recipe): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/create/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
      .post<Recipe>( endpoint, recipe, { headers })
      .subscribe(response => {
        console.log(response);
      });
  }

}
