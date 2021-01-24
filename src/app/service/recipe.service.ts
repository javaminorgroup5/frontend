import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  userId = '';
  recipes: Recipe[] = [];

  constructor(private http: HttpClient, private baseService: BaseService) { }

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
    const endpoint = `/recipe/${id}?q=${query}`;
    return this.baseService.getApiCall(endpoint);
  }

  async getAllRecipesByGroupId(id: number, query: string): Promise<any> {
    const endpoint = `/recipe/group/${id}?q=${query}`;
    return this.baseService.getApiCall(endpoint);
  }

  async deleteRecipe(recipeId: number, userId: number): Promise<any> {
    const endpoint = `/recipe/${recipeId}/user/${userId}`;
    this.baseService.deleteApiCall(endpoint);
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
    const endpoint = `/recipe/${recipeId}/share/${shareLink}`;
    return this.baseService.getApiCall(endpoint);
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
    const endpoint = `/recipe/${recipeId}/user/${userId}`;
    return this.baseService.getApiCall(endpoint);
  }

  async getRecipeToShare(recipeId: number): Promise<any> {
    const endpoint = `/recipe/${recipeId}/share`;
    return this.baseService.getApiCall(endpoint);
  }

}
