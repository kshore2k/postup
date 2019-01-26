import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataSharingService } from '../data-sharing.service';
import * as jquery from '../../assets/jquery/all-posts_component.js';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any;
  user: any;

  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService) { 
    this._dataSharingService.loggedInUser.subscribe( value => {  // Subscribe to User Data Saved in DataSharingService
      this.user = value;
    })
  }

  ngOnInit() {
    jquery;
    this.allPostsFromService();
    // this.getAuth();
  }

  allPostsFromService(){
    let observable = this._httpService.getAllPosts();
    observable.subscribe(data => {
      console.log("Getting All Posts");
      this.posts = data;
    })
  }

  // getAuth(){
  //   let observable = this._httpService.authenticate();
  //   observable.subscribe(data => {
  //     console.log("Getting Authentication", data);
  //     if(data['msg']==="True"){
  //       this.username = data['username'];
  //     }
  //   })
  // }

}
