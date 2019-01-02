import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any;
  username: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.allPostsFromService();
    this.getAuth();
  }

  allPostsFromService(){
    let observable = this._httpService.getAllPosts();
    observable.subscribe(data => {
      console.log("Getting All Posts");
      this.posts = data;
    })
  }

  getAuth(){
    let observable = this._httpService.authenticate();
    observable.subscribe(data => {
      console.log("Getting Authentication", data);
      if(data['msg']==="True"){
        this.username = data['username'];
      }
    })
  }

}
