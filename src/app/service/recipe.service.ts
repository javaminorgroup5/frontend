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

  async addRecipe(id: number, recipe: FormData): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/create/${id}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
      .post<Recipe>(endpoint, recipe, { headers })
      .toPromise();
  }

  async getAllRecipesByUserId(id: number, query: string): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    return await this.http
      .get<[]>(`http://localhost:8080/recipe/${id}?q=${query}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(`${email}:${password}`),
        },
      }).toPromise();
  }

  async getAllRecipesByGroupId(id: number, query: string): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    return await this.http
      .get<[]>(`http://localhost:8080/recipe/group/${id}?q=${query}`, {
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

    return this.http
      .delete<any>(endpoint, { headers })
      .toPromise();
  }



  async generateShareLink(recipeId: number): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const userId = sessionStorage.getItem('userId') || '';

    try {
      return await this.http
        .post(`http://localhost:8080/recipe/${recipeId}/generate_share_link`, { userId }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${email}:${password}`),
          },
        })
        .toPromise<any>();
    } catch (error) {
      return error;
    }
  }

  async getRecipeByShareLink(recipeId: number, shareLink: string): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    return await this.http
      .get(`http://localhost:8080/recipe/${recipeId}/share/${shareLink}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(`${email}:${password}`),
          },
        })
      .toPromise();
  }

  async updateRecipe(recipeId: number, userId: number, recipe: FormData): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/${recipeId}/user/${userId}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http
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

  async getRecipeToShare(recipeId: number): Promise<any> {
    const endpoint = `http://localhost:8080/recipe/${recipeId}/share`;
    return await this.http
      .get<Recipe>(endpoint)
      .toPromise();
  }

}
