import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeComponent } from './me/me.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'me', component: MeComponent },
  {path: 'update', component: UpdateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
