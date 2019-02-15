import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isUserLoggedIn: boolean;
  user: any;
  profile: any;
  image_set: Boolean = false;
  image_url: any;
  avatar_set: Boolean = false;
  selectedFile: File = null;

  constructor(private _httpService: HttpService, private _router: Router, private _dataSharingService: DataSharingService) { 
    this._dataSharingService.isUserLoggedIn.subscribe( value => { // Subscribe to Login Boolean in DataSharingService
      this.isUserLoggedIn = value;
    })

    this._dataSharingService.loggedInUser.subscribe( value => {  // Subscribe to User Data Saved in DataSharingService
      this.user = value;
    })
  }

  ngOnInit() {
    this.runJquery();
    this.getProfile();
    // this.getAuth();
  }

  // getAuth(){
  //   let observable = this._httpService.authenticate();
  //   observable.subscribe(data => {
  //     console.log("Getting Authentication", data);
  //     if(data['msg']==="True"){
  //       this.getProfile(data['user_id']);
  //     }
  //   })
  // }

  // getProfile(id){
  //   let observable = this._httpService.getOneUser(id);
  //   observable.subscribe(data => {
  //     console.log("Profile Fetched", data);
  //     this.user = data;
  //   })
  // }

  // GET USER PROFILE FROM SERVICE
  getProfile(){
    let observable = this._httpService.getOneUser(this.user._id);
    observable.subscribe(data => {
      console.log("Getting User Profile",data);
      this.profile = data;
    })
  }

  // POPUP + SEND EDIT PASSWORD EMAIL
  editPasswordRequest(id){
    if(window.confirm('Sending email containing password reset instructions!')){
      let observable = this._httpService.requestPasswordChange(id);
      observable.subscribe(data => {
        console.log(data);
        this._router.navigate(['/dashboard']);
      })
    }
  }

  // SELECT AVATAR IMAGE
  onFileSelected(event){
    console.log(event)
    this.selectedFile = <File>event.target.files[0];
    this.image_set = true;
  }

  // UPLOAD AVATAR IMAGE
  uploadImage(){
    const imageData = new FormData();
    imageData.append('file', this.selectedFile, this.selectedFile.name);
    let observable = this._httpService.uploadImage(imageData);
    observable.subscribe(data => {
      console.log(data);
      this.image_url = {image: data['url']};
      let observable = this._httpService.setAvatar(this.user._id,this.image_url);
      observable.subscribe(data => {
        console.log(data);
        this.avatar_set = true;
        this.getProfile(); // Fetches Profile Again for Real-Time Avatar Update
      })
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
