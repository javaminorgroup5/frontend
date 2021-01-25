import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group-view/group-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MeComponent } from './me/me.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeViewComponent } from './recipe/recipe-view/recipe-view.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { GroupEnrollmentComponent } from './group-enrollment/group-enrollment.component';
import {RecipeListGroupComponent} from './recipe/recipe-list-group/recipe-list-group.component';
import {FeedProfileComponent} from './feed-profile/feed-profile.component';
import { FeedInviteComponent } from './group/feed-invite/feed-invite.component';
import { EnrolledUsersForGroupComponent } from './enrolled-users-for-group/enrolled-users-for-group.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { CategoryEditComponent } from './admin/category-edit/category-edit.component';


@NgModule({
  declarations: [AppComponent,
    RegisterComponent,
    LoginComponent,
    MeComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    RecipeListGroupComponent,
    GroupComponent,
    GroupListComponent,
    GroupDetailComponent,
    UpdateProfileComponent,
    RecipeViewComponent,
    HomeComponent,
    FeedComponent,
    GroupEnrollmentComponent,
    FeedProfileComponent,
    FeedInviteComponent,
    EnrolledUsersForGroupComponent,
    AdminViewComponent,
    CategoryListComponent,
    CategoryEditComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [HttpClient, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
