import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.allPostsFromService();
  }

  allPostsFromService(){
    let observable = this._httpService.getAllPosts();
    observable.subscribe(data => {
      console.log("Getting All Posts");
      this.posts = data;
    })
  }

}
