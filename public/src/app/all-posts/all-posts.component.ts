import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataSharingService } from '../data-sharing.service';
import * as $ from 'jquery';

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
    this.runJquery();
    this.allPostsFromService();
  }

  allPostsFromService(){
    let observable = this._httpService.getAllPosts();
    observable.subscribe(data => {
      console.log("Getting All Posts");
      this.posts = data;
    })
  }

  runJquery(){
    $(document).ready(function(){

      // Scroll Top Animation
      $('#page_top').children().click(function(){
          $('html, body').animate({scrollTop: $('html').offset().top}, 500)
      })
  
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
