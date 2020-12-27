import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';
import { ActivatedRoute, Router } from '@angular/router';
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

  selectedFile: any;
  recipeForm;
  recieiId = -1;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const userId = sessionStorage.getItem('userId');
    if (id && userId) {
      this.recieiId = this.commonService.NumberConverter(id);
      this.loadRecipe(this.recieiId);
      console.log(this.recipe);
    }
  }

  async loadRecipe(recipeiId: number,): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe = await this.recipeService.getRecipe(recipeiId, this.commonService.NumberConverter(userId));
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
      const recipe: Recipe = {
        recipe: formData.recipe,
        description: formData.description,
        title: formData.title
      };
      const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
      const recipeObjectString = JSON.stringify(recipe);
      const recipeBlob = new Blob([recipeObjectString], { type: 'application/json' });
      uploadImageData.append('recipe', recipeBlob);
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        let result = '';
        const id = parseInt(userId);
        if (this.recieiId >= 0) {
          result = await this.recipeService.updateRecipe(this.recieiId, id, uploadImageData);
        } else {
          result = await this.recipeService.addRecipe(id, uploadImageData);
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
