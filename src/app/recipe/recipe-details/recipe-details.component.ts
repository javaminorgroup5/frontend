import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface FormData {
  recipe: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipeId = -1;

  selectedFile: any;
  recipeForm;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public activeModal: NgbActiveModal,
  ) {
    this.recipeForm = this.formBuilder.group({
      recipe: '',
      description: '',
      title: ''
    });
    this.recipe = {
      recipe: '',
      description: '',
      title: ''
    };
    this.activeModal = activeModal;
  }

  public onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');

    if (userId && this.recipeId > 0) {
      this.recipeId = this.commonService.NumberConverter(this.recipeId);
      this.loadRecipe(this.recipeId);
    }
  }

  async loadRecipe(recipeId: number): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe = await this.recipeService.getRecipe(recipeId, this.commonService.NumberConverter(userId));
    if (result) {
      const recipe =
      {
        id: result.id,
        recipe: result.recipe,
        description: result.description,
        title: result.title,
        recipeImage: result.recipeImage,
      };
      this.recipe = recipe;
    }
  }

  async onSubmit(formData: FormData): Promise<void> {
    try {
      const recipe: Recipe = { title: formData.title, recipe: formData.recipe, description: formData.description };
      const userId = sessionStorage.getItem('userId');

      if (this.selectedFile) {
        const reader = new FileReader();

        reader.readAsDataURL(this.selectedFile);
        reader.onload = async () => {
          const recipeImage = reader.result as string || '';

          recipe.recipeImage = recipeImage;

          if (userId) {
            let result = '';
            const id = parseInt(userId, undefined);

            if (this.recipeId >= 0) {
              result = await this.recipeService.updateRecipe(this.recipeId, id, recipe);
            } else {
              result = await this.recipeService.addRecipe(id, recipe);
            }
            if (result) {
              window.location.reload();
            }
          }
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
}
