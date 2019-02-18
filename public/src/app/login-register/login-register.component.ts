import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginUser: any;
  newUser: any;
  loginFlash: any;
  registerFlash: any;
  confirmation: any;

  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService, private _router: Router) { }

  ngOnInit() {
    this.runJquery();
    this.loginUser = {email: "", password: ""};
    this.newUser = {first_name: "", last_name: "", email: "", username: "", password: ""};
  }

  checkLogin(){
    let observable = this._httpService.login(this.loginUser);
    observable.subscribe(data => {
      console.log(data);
      this.loginUser = {email: "", password: ""};
      if(data['msg']==='Logged In User'){
        this._dataSharingService.loggedInUser.next(data['info']); // Sets User info in DataSharingService to Current User
        this._dataSharingService.isUserLoggedIn.next(true); // Sets Login Boolean in DataSharingService to true
        this._router.navigate(['/dashboard']);
      }
      else {
        this.loginFlash = data['msg'];
        console.log(this.loginFlash);
      }
    })
  }

  // VALIDATIONS
  registerUser(){
    let observable = this._httpService.createUser(this.newUser);
    observable.subscribe(data => {
      console.log("Created One User", data);
      if(data['errors']){
        console.log(data['errors']);
        this.registerFlash = data['errors'];
      }
      else {
        this._dataSharingService.loggedInUser.next(data);
        this._dataSharingService.isUserLoggedIn.next(true);
        this.confirmation = "Successfully Registered!"
        setTimeout( () => {
          this._router.navigate(['/dashboard']);
        },2000)
      }
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

      $('#show_registration').click(function(){
        $('#registration_wrap').fadeIn('slow')
      });

      $('#web_cancel, #mbl_cancel').click(function(){
        $('#registration_wrap').css('display', 'none')
        $('.register').val('')
      })
    })
  }

}
