import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newPost: any;
  newPost_id: any;
  // username: any;
  isUserLoggedIn: boolean;

  constructor(private _httpService: HttpService, private _router: Router, private _dataSharingService: DataSharingService) {
    this._dataSharingService.isUserLoggedIn.subscribe( value => { // Subscribe to Login Boolean in DataSharingService
      this.isUserLoggedIn = value;
    })
  }

  ngOnInit() {
    // this.getAuth();
    this.newPost = {title: "", content: ""};
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

  addPost(){
    let observable = this._httpService.createPost(this.newPost);
    observable.subscribe(data => {
      console.log("Created Post");
      this.newPost_id = data['_id'];
      this._router.navigate(['/post', this.newPost_id])
    })
  }

}
