import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MeComponent } from './me/me.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, MeComponent, GroupComponent, GroupListComponent, GroupDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
