import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  userId = '';
  recipes: Recipe[] = [];

  constructor(private http: HttpClient) {}

  async addRecipe(id: number, recipe: FormData): Promise<any> {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const endpoint = `http://localhost:8080/recipe/create/${id}`;
    const headers = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return await this.http
      .post<Recipe>( endpoint, recipe, { headers })
      .subscribe(response => {
        console.log(response);
      });
  }

  async getAllRecipesByUserId(id: number): Promise<[]> {
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

}
