import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { RegisterComponent } from './register/register.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'me', component: MeComponent },
  {path: 'group', component: GroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
