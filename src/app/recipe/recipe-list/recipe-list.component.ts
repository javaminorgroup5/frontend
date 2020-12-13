import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = new Array();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  async loadRecipes(): Promise<any>  {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe[] = await this.recipeService.getAllRecipesByUserId(parseInt(userId, 2));
    if (result) {
      for (const r of result) {
        const recipe =
        {
          id: r.id,
          recipe: r.recipe,
          description: r.description,
          title: r.title,
          recipeImage:
          {
            type: r.recipeImage?.type,
            name: r.recipeImage?.name,
            picByte: 'data:image/jpeg;base64,' + r.recipeImage?.picByte
          }
        };
        this.recipes.push(recipe);
      }
      console.log(this.recipes);
    }
  }

  NumberConverter = (value: any) => {
    if (value === null || value === undefined || typeof value === 'number') {
        return value;
    }

    return parseFloat(value.toString());
  }

  async deleteRecipe(id: any): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: any = await this.recipeService.deleteRecipe(this.NumberConverter(id), parseInt(userId, 2)).finally();
    this.loadRecipes();
    console.log(result);
  }

  async updateRecipe(id: any): Promise<any> {
    console.log(id);
  }
}
