import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RegisterComponent } from './register/register.component';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MeComponent },
  { path: 'group-list', component: GroupListComponent },
  { path: 'group/create', component: GroupComponent },
  { path: 'group/:groupId', component: GroupDetailComponent },
  { path: 'recipe/details', component: RecipeDetailsComponent },
  { path: 'recipe/list', component: RecipeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
