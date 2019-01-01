import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loggedIn_username: any;
  loggedIn_user_id: any;
  
  constructor(private _http: HttpClient) { }

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
    return this._http.put('api/posts/'+id+'/comment', newComment);
  }

  login(login_user){
    return this._http.post('/api/login', login_user);
  }

}
