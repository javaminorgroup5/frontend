import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

import { HttpClient } from '@angular/common/http';

interface FormData {
  recipe: string;
  description: string;
}

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  selectedFile: any;
  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.recipeForm = this.formBuilder.group({
      recipe: '',
      description: ''
    });
  }

  public onFileChanged(event: any): void {
        this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {}

  async onSubmit(formData: FormData): Promise<void> {
    try {
      console.log(formData.recipe);
      console.log(formData.description);
      console.log(this.selectedFile.name);
      const recipe: Recipe = {
        recipe: formData.recipe,
        description: formData.description,
      };
      const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
      const recipeObjectString = JSON.stringify(recipe);
      const recipeBlob = new Blob([recipeObjectString], { type: 'application/json'});
      uploadImageData.append('recipe', recipeBlob);
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const result = await this.recipeService.addRecipe(parseInt(userId, 2), uploadImageData);
        if (result) {
          // TODO
          // this.router.navigate(['recipe/list']);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

}
