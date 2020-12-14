import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

import { RecipeService } from '../recipe/service/recipe.service';
import { Recipe } from '../recipe/model/recipe';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
  profile: any;
  recipes: Recipe[] = new Array();

  constructor(
      private profileService: ProfileService,
      private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileService.getUser(parseInt(userId, 2)).then((value) => {
        this.profile = value;
      });
    }
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
}
