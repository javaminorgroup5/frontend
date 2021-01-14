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
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [AppComponent,
    RegisterComponent,
    LoginComponent,
    MeComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    GroupComponent,
    GroupListComponent,
    GroupDetailComponent,
    UpdateProfileComponent,
    RecipeViewComponent,
    HomeComponent,
    FeedComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // mag deze module weg? BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [HttpClient, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
