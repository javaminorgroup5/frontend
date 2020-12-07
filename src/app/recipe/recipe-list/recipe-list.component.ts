import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes = [];

  constructor(private recipeService: RecipeService) { }

  async ngOnInit(): Promise<any> {
    const result = await this.recipeService.getAllRecipes();
    if (result) {
      this.recipes = result;
    }
  }

}
