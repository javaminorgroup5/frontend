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
    console.log(id, 'id');
    const userId = sessionStorage.getItem('userId');
    if (id && userId) {
      this.recipeId = this.commonService.NumberConverter(id);
      this.loadRecipe(this.recipeId).then(r => console.log(r));
    }
    console.log('ngOnInit');
  }

  async loadRecipe(recipeiId: number, ): Promise<any>  {
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

}
