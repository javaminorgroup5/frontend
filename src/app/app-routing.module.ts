import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { RegisterComponent } from './register/register.component';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'me', component: MeComponent },
  {path: 'group-list', component: GroupListComponent },
  {path: 'group', component: GroupComponent },
  { path: 'group/:groupId', component: GroupDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
