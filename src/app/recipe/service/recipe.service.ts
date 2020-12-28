import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  userId = '';
  recipes: Recipe[] = [];

  constructor(private http: HttpClient) { }

  async addRecipe(id: number, recipe: Recipe): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/create/${id}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`),
    };

    return await this.http
      .post<Recipe>(endpoint, recipe, { headers })
      .toPromise();
  }

  async getAllRecipesByUserId(id: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    return await this.http
      .get<[]>(`http://localhost:8080/recipe/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      }).toPromise();
  }

  async deleteRecipe(recipeId: number, userId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/${recipeId}/user/${userId}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };

    return await this.http
      .delete<any>(endpoint, { headers })
      .subscribe(response => {
        console.log(response);
      });
  }

  async updateRecipe(recipeId: number, userId: number, recipe: Recipe): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/${recipeId}/user/${userId}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };

    return await this.http
      .put<any>(endpoint, recipe, { headers })
      .toPromise();
  }

  async getRecipe(recipeId: number, userId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/${recipeId}/user/${userId}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
      .get<Recipe>(endpoint, { headers })
      .toPromise();
  }

}
