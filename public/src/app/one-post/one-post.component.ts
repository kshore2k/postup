import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {
  post_id: any;
  post: any;
  newComment: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.onePostFromService();
    this.newComment = {user_id: "", username: "", comment: ""};
  }

  onePostFromService(){
    this._route.params.subscribe(params => {
      console.log(`Post id: ${params.id}`);
      this.post_id = params.id;
      let observable = this._httpService.getOnePost(this.post_id);
      observable.subscribe(data => {
        console.log("Getting One Post");
        this.post = data;
      })
    })
  }

  addComment(id){
    let observable = this._httpService.addCommentToPost(id,this.newComment);
    observable.subscribe(data => {
      console.log(`Comment Added To Post id: ${this.post_id}`);
      this.onePostFromService();
      this.newComment = {user_id: "", username: "", comment: ""};
    })
  }

}
