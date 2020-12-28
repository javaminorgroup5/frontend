import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';
import { CommonService } from 'src/app/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = new Array();
  recipeId = -1;

  constructor(
    private recipeService: RecipeService,
    private commonService: CommonService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  handleEditting(): void {
    const modalRef = this.modalService.open(RecipeDetailsComponent, { centered: true });
    modalRef.componentInstance.recipeId = this.recipeId;
  }

  async loadRecipes(): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe[] = await this.recipeService.getAllRecipesByUserId(parseInt(userId, undefined));

    if (result) {
      for (const r of result) {
        const recipe =
        {
          id: r.id,
          recipe: r.recipe,
          description: r.description,
          title: r.title,
          recipeImage: r.recipeImage,
        };
        this.recipes.push(recipe);
      }
    }
  }

  async deleteRecipe(id: any): Promise<any> {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }

    await this.recipeService.deleteRecipe(this.commonService.NumberConverter(id), parseInt(userId, undefined));
    window.location.reload();
  }

  updateRecipe(id: any): void {
    this.recipeId = id;
    this.handleEditting();
  }
}
