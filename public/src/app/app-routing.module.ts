import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPostsComponent } from './all-posts/all-posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { OnePostComponent } from './one-post/one-post.component';
import { ProfileComponent } from './profile/profile.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendsProfileComponent } from './friends-profile/friends-profile.component';
import { NewsComponent } from './news/news.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: AllPostsComponent },
  { path: 'post', component: NewPostComponent },
  { path: 'post/:id', component: OnePostComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id/edit', component: EditPasswordComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'friends/:id', component: FriendsProfileComponent },
  { path: 'news', component: NewsComponent },
  { path: 'login', component: LoginRegisterComponent},
  { path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
