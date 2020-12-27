import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';
import { Router } from '@angular/router';
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
  openRecipe: Subject<boolean> = new Subject();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private commonService: CommonService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  handleEditting(): void {
    const modalRef = this.modalService.open(RecipeDetailsComponent);
    modalRef.componentInstance.name = 'Recipe details';
  }

  async loadRecipes(): Promise<any>  {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe[] = await this.recipeService.getAllRecipesByUserId(parseInt(userId));
    if (result) {
      for (const r of result) {
        const recipe =
        {
          id: r.id,
          recipe: r.recipe,
          description: r.description,
          title: r.title,
          recipeImage:
          {
            type: r.recipeImage?.type,
            name: r.recipeImage?.name,
            picByte: 'data:image/jpeg;base64,' + r.recipeImage?.picByte
          }
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
    await this.recipeService.deleteRecipe(this.commonService.NumberConverter(id), parseInt(userId));
    window.location.reload();
  }

  async updateRecipe(id: any): Promise<any> {
    if (!id) {
      console.log('user id not found');
      return;
    }
    this.router.navigate(['recipe/details', { id }]);
  }
}
