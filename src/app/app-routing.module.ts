import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GroupComponent } from './group/group-view/group-view.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { HomeComponent } from './home/home.component';
import {AdminViewComponent} from './admin/admin-view/admin-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MeComponent },
  { path: 'group-list', component: GroupListComponent },
  { path: 'group/create', component: GroupComponent },
  { path: 'group/:groupId', component: GroupDetailComponent },
  { path: 'recipe/details', component: RecipeDetailsComponent },
  { path: 'recipe/list', component: RecipeListComponent },
  { path: 'update', component: UpdateProfileComponent },
  { path: 'recipe/:recipeId', component: RecipeViewComponent },
  { path: 'admin', component: AdminViewComponent },
  { path: 'recipe/:recipeId/share', component: RecipeViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
