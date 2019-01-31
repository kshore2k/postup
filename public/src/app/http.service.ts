import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  // POSTS
  getAllPosts(){
    return this._http.get('/api/posts');
  }

  getOnePost(id){
    return this._http.get('/api/posts/'+id);
  }

  createPost(newPost){
    return this._http.post('/api/posts', newPost);
  }

  addCommentToPost(id,newComment){
    return this._http.put('/api/posts/'+id+'/comment', newComment);
  }

  deletePost(id){
    return this._http.delete('/api/posts/'+id);
  }
  // AUTHENTICATION
  login(login_user){
    return this._http.post('/api/login', login_user);
  }

  logout(){
    return this._http.get('/api/logout');
  }

  authenticate(){
    return this._http.get('api/auth');
  }
 
  // USERS
  createUser(newUser){
    return this._http.post('/api/users', newUser);
  }

  getOneUser(id){
    return this._http.get('/api/users/'+id);
  }

  getFriends(id){
    return this._http.get('/api/users/'+id+'/friends');
  }

  addFriend(userId,friendId){
    return this._http.put('/api/users/'+userId+'/friends/'+friendId, null);
  }

  removeFriend(userId,friendId){
    return this._http.patch('/api/users/'+userId+'/friends/'+friendId, null);
  }

  requestPasswordChange(id){
    return this._http.get('/api/users/'+id+'/email');
  }

  changePassword(id,newPassword){
    return this._http.put('/api/users/'+id, newPassword);
  }

  // NEWS
  getTechCrunch(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=84a2560fcff14846a83c31297697500e');
  }

  getNextBigFuture(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=next-big-future&apiKey=84a2560fcff14846a83c31297697500e');
  }

  getTechRadar(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=techradar&apiKey=84a2560fcff14846a83c31297697500e');
  }

  getPolygon(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=polygon&apiKey=84a2560fcff14846a83c31297697500e');
  }

  getWired(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=wired&apiKey=84a2560fcff14846a83c31297697500e');
  }

  getTheVerge(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=84a2560fcff14846a83c31297697500e');
  }

  getIgn(){
    return this._http.get('https://newsapi.org/v2/top-headlines?sources=ign&apiKey=84a2560fcff14846a83c31297697500e');
  }

}
