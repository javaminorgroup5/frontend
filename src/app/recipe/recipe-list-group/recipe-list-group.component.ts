import {Component, OnInit} from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../model/recipe';
import { CommonService } from 'src/app/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list-group',
  templateUrl: './recipe-list-group.component.html',
  styleUrls: ['./recipe-list-group.component.css']
})
export class RecipeListGroupComponent implements OnInit {

  recipes: Recipe[] = [];
  recipeId = -1;

  groupId: any = '';

  constructor(
    private recipeService: RecipeService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.groupId = this.route.snapshot.paramMap.get('groupId');

    this.loadRecipes(this.groupId).then(r => {
      console.log(r);
    });

  }

  handleEditing(): void {
    const modalRef = this.modalService.open(RecipeDetailsComponent, { centered: true });
    modalRef.componentInstance.recipeId = this.recipeId;
    modalRef.componentInstance.groupId = this.groupId;
  }

  async loadRecipes(groupId: any): Promise<any>  {
    if (groupId >= 0) {
      const result: Recipe[] = await this.recipeService.getAllRecipesByGroupId(parseInt(groupId, 0));
      if (result) {
        for (const r of result) {
          const recipe =
              {
                id: r.id,
                recipe: r.recipe,
                description: r.description,
                title: r.title,
                image:
                    {
                      type: r.image?.type,
                      name: r.image?.name,
                      picByte: 'data:image/jpeg;base64,' + r.image?.picByte
                    }
              };
          this.recipes.push(recipe);
        }
      }
    }
  }

  async deleteRecipe(id: any): Promise<any> {
    if (!confirm('Weet je zeker dat je dit item wilt verwijderen?')) {
      return;
    }
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
    this.handleEditing();
  }

  viewRecipe(id: any): void {
    this.recipeId = id;
    this.router.navigate(['recipe/' + id]);
  }
}
