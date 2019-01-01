import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { OnePostComponent } from './one-post/one-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { NewsComponent } from './news/news.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPostsComponent,
    OnePostComponent,
    NewPostComponent,
    PageNotFoundComponent,
    ProfileComponent,
    FriendsComponent,
    NewsComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
