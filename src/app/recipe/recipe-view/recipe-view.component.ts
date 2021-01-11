import { Component, OnInit } from '@angular/core';
import {Recipe} from '../model/recipe';
import {RecipeService} from '../service/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../common.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  imageURL = '';
  selectedFile: any;
  recipeId = -1;
  recipe: Recipe;
  userId?: number;

  constructor(
      private recipeService: RecipeService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private commonService: CommonService,
  ) {
    this.recipe = {
      recipe: '',
      description: '',
      title: ''
    };
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('recipeId');
    this.userId = parseInt(sessionStorage.getItem('userId') || '', undefined);

    if (id && this.userId) {
      this.recipeId = this.commonService.NumberConverter(id);
      this.loadRecipe(this.recipeId).then(r => console.log(r));
    }
    console.log('ngOnInit');
  }

  async loadRecipe(recipeiId: number, ): Promise<any>  {
    if (!this.userId) {
      return;
    }
    const result: Recipe = await this.recipeService.getRecipe(recipeiId, this.userId);
    if (result) {
      const recipe =
          {
            id: result.id,
            recipe: result.recipe,
            description: result.description,
            title: result.title,
            userId: result.userId,
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

}
