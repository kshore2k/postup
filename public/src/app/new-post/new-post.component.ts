import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import * as $ from 'jquery';

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
    this.runJquery();
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

  runJquery(){
    $(document).ready(function(){

      // Scroll Top Animation
      $('#page_top').children().click(function(){
          $('html, body').animate({scrollTop: $('html').offset().top}, 500)
      });
  
      // Social Link Hover Effects
      var imageSrc;
      $('.social_icon').hover(
          function(){
              imageSrc = $(this).attr('src');
              $(this).attr('src', $(this).attr('hover'))
          },
          function(){
              $(this).attr('src', imageSrc)
          }
      );
  
    })
  }

}
