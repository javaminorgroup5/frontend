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

  async ngOnInit(): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe[] = await this.recipeService.getAllRecipesByUserId(parseInt(userId, 2));
    if (result) {
      console.log(result.length);
      for (let i = 0; i < result.length; i++) {
        console.log(i);
        const test =
        {
          recipe: result[i].recipe, description: result[i].description,
          recipeImage:
          {
            type: result[i].recipeImage?.type,
            name: result[i].recipeImage?.name,
            picByte: 'data:image/jpeg;base64,' + result[i].recipeImage?.picByte
          }
        };
        this.recipes.push(test);
      }
      console.log(this.recipes);
    }
  }

}
