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
    const endpoint = `/recipe/create/${id}`;
    return this.baseService.postApiCall(endpoint, recipe)
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
    const userId = sessionStorage.getItem('userId') || '';
    const endpoint = `/recipe/${recipeId}/generate_share_link`;
    return this.baseService.postApiCall(endpoint,{userId});

  }

  async getRecipeByShareLink(recipeId: number, shareLink: string): Promise<any> {
    const endpoint = `/recipe/${recipeId}/share/${shareLink}`;
    return this.baseService.getApiCall(endpoint);
  }

  async updateRecipe(recipeId: number, userId: number, recipe: FormData): Promise<any> {
    const endpoint = `/recipe/${recipeId}/user/${userId}`;
    return this.baseService.putApiCall(endpoint, recipe);
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
