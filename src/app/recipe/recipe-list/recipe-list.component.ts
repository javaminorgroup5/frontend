import {Component, OnInit} from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../model/recipe';
import { CommonService } from 'src/app/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

interface FormData {
    query: string;
}

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [];
    recipeId = -1;
    queryForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
      this.queryForm = this.formBuilder.group({
          query: '',
      });
  }

  ngOnInit(): void {
      // TODO hierdoor komen recepten twee keer in de lijst
      this.recipes = [];
      this.loadUserRecipes(this.queryForm?.value.query);
      this.loadRecipesByGroup(this.queryForm?.value.query);
  }

  onSubmit(formData: FormData): void {
      this.recipes = [];
      this.loadRecipesByGroup(formData.query);
  }


  handleEditing(): void {
    const modalRef = this.modalService.open(RecipeDetailsComponent, { centered: true });
    modalRef.componentInstance.recipeId = this.recipeId;
  }

  async loadRecipesByGroup(query = ''): Promise<any>  {
      // TODO check wie hier meer bezig is
    const groupId = '1';
    const result: Recipe[] = await this.recipeService.getAllRecipesByGroupId(parseInt(groupId, 0), query);

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

  async loadUserRecipes(query = ''): Promise<any>  {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('user id not found');
      return;
    }
    const result: Recipe[] = await this.recipeService.getAllRecipesByUserId(parseInt(userId, 0), query);
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
