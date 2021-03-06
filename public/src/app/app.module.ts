import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { DataSharingService } from './data-sharing.service';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';

import { AppComponent } from './app.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { OnePostComponent } from './one-post/one-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { NewsComponent } from './news/news.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { FriendsProfileComponent } from './friends-profile/friends-profile.component';

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
    LoginRegisterComponent,
    EditPasswordComponent,
    FriendsProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService,DataSharingService,ChatService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
