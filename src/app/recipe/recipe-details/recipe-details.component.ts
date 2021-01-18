import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../model/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
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

  imageURL = '';
  selectedFile: any;
  recipeForm;
  recipeId = -1;
  recipe: Recipe;
  recipeAlert = false;
  titleAlert = false;
  descriptionAlert = false;
  imageAlert = false;

  constructor(
      private recipeService: RecipeService,
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private commonService: CommonService,
      public activeModal: NgbActiveModal,
  ) {
    this.recipe = {
      recipe: '',
      description: '',
      title: ''
    };
    this.recipeForm = this.formBuilder.group({
      recipe: '',
      description: '',
      title: ''
    });
    this.activeModal = activeModal;
  }

  public onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    if (this.recipeId > 0) {
      this.loadRecipe(this.recipeId).then(r => console.log(r));
    }
  }


  async loadRecipe(recipeiId: number): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe = await this.recipeService.getRecipe(recipeiId, this.commonService.NumberConverter(userId));
    if (result) {
      this.recipeForm = this.formBuilder.group({
        recipe: result.recipe,
        description: result.description,
        title: result.title
      });
    }
  }

  checkRecipeValues(formData: FormData): boolean {
    this.titleAlert = false;
    this.descriptionAlert = false;
    this.recipeAlert = false;
    this.imageAlert = false;
    if (!formData.title) {
      this.titleAlert = true;
      return false;
    }
    if (!formData.description) {
      this.descriptionAlert = true;
      return false;
    }
    if (!formData.recipe) {
      this.recipeAlert = true;
      return false;
    }
    if (!this.selectedFile) {
      this.imageAlert = true;
      return false;
    }
    return true;
  }

  async onSubmit(formData: FormData): Promise<void> {

    if (this.recipeId < 0 && !this.checkRecipeValues(formData)) {
      return;
    }

    try {
      const recipe: Recipe = {
        recipe: formData.recipe,
        description: formData.description,
        title: formData.title
      };
      const uploadImageData = new FormData();
      if (this.selectedFile) {
        uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
      }
      const recipeObjectString = JSON.stringify(recipe);
      const recipeBlob = new Blob([recipeObjectString], {type: 'application/json'});
      uploadImageData.append('recipe', recipeBlob);
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        let result: string;
        const id = parseInt(userId, 0);
        if (this.recipeId >= 0) {
          result = await this.recipeService.updateRecipe(this.recipeId, id, uploadImageData);
        } else {
          result = await this.recipeService.addRecipe(id, uploadImageData);
        }
        if (result) {
          console.log(result);
          location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

}
