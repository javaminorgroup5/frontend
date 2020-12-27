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
  @Input() recipeId: number = -1;

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

  async loadRecipe(recipeId: number,): Promise<any> {
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
        recipeImage:
        {
          type: result.recipeImage?.type,
          name: result.recipeImage?.name,
          picByte: 'data:image/jpeg;base64,' + result.recipeImage?.picByte
        }
      };
      this.recipe = recipe;
    }
  }

  async onSubmit(formData: FormData): Promise<void> {
    try {
      const recipeFormData = new FormData();
      const userId = sessionStorage.getItem('userId');

      if (this.selectedFile) {
        recipeFormData.append('file', this.selectedFile, this.selectedFile.name);
      }

      recipeFormData.append('recipe', formData.recipe);
      recipeFormData.append('description', formData.description);
      recipeFormData.append('title', formData.title);

      if (userId) {
        let result = '';
        const id = parseInt(userId);

        if (this.recipeId >= 0) {
          result = await this.recipeService.updateRecipe(this.recipeId, id, recipeFormData);
        } else {
          result = await this.recipeService.addRecipe(id, recipeFormData);
        }
        if (result) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
