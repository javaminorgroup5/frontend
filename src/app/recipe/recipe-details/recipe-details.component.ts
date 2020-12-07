import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

interface FormData {
  recipe: string;
  description: string;
  picture: string;
}

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.recipeForm = this.formBuilder.group({
      recipe: '',
      description: '',
      picture: '',
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(formData: FormData): Promise<void> {
    try {
      const recipe: Recipe = {
        recipe: formData.recipe,
        descripion: formData.description,
        picture: formData.picture
      };
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const result = await this.recipeService.addRecipe(parseInt(userId, 2), recipe);
        if (result) {
          this.router.navigate(['recipe/list']);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

}
