import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newPost: any;
  newPost_id: any;

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.newPost = {user_id: "", username: "", title: "", content: ""};
  }

  addPost(){
    let observable = this._httpService.createPost(this.newPost);
    observable.subscribe(data => {
      console.log("Created Post");
      this.newPost_id = data['_id'];
      this._router.navigate(['/post', this.newPost_id])
    })
  }

}
