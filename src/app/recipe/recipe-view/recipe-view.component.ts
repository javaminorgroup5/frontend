import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../common.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  imageURL = '';
  selectedFile: any;
  recipeId = -1;
  alert?: Alert;
  recipe: Recipe;
  userId?: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {
    this.recipe = {
      recipe: '',
      description: '',
      title: ''
    };
  }

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId') || '', undefined);

    if (this.userId) {

      this.route.paramMap.subscribe(params => {
        this.recipeId = this.commonService.NumberConverter(params.get('recipeId'));

        if (this.recipeId) {
          this.route.queryParamMap.subscribe(queryParams => {
            const shareLink = queryParams.get('shareLink');

            if (shareLink) {
              this.recipeService.getRecipeByShareLink(this.recipeId, shareLink)
                .then((result: any) => {
                  this.recipe = result;
                })
            } else {
              this.loadRecipe(this.recipeId);
            }
          });
        }
      });
    }
  }

  async generateShareLink() {
    if (this.recipe.id) {
      this.recipeService.generateShareLink(this.recipe.id).then(({ shareLink }) => {
        this.alert = {
          type: 'success',
          message: `Uitnodigingslink gegenereerd: http://localhost:4200/recipe/${this.recipe.id}?shareLink=${shareLink}`,
        };
      });
    }
  }

  close(): void {
    this.alert = undefined;
  }

  async loadRecipe(recipeiId: number,): Promise<any> {
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
