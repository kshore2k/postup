import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { DataSharingService } from './data-sharing.service';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isUserLoggedIn: boolean;
  user: any;

  guestUser: Object = {email: "postupguest@gmail.com", password: "12345678"}; // **For Demonstration Only

  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService, private _router: Router, private _chatService: ChatService){
    this._dataSharingService.isUserLoggedIn.subscribe( value => { // Subscribe to Login Boolean in DataSharingService
      this.isUserLoggedIn = value;
    })
    
    this._dataSharingService.loggedInUser.subscribe( value => {  // Subscribe to User Data Saved in DataSharingService
      this.user = value;
    })
    
  }

  ngOnInit(){
    this.runJquery();
    if(localStorage.getItem('guest') != 'true'){ // Allows for One Initial Guest Login
      this.guestLogin();
    }
  }

  // **FOR FUNCTIONALITY DEMONSTRATION ONLY
  guestLogin(){
    let observable = this._httpService.login(this.guestUser);
    observable.subscribe(data => {
      console.log(data);
      this._dataSharingService.loggedInUser.next(data['info']); // Sets User info in DataSharingService to Current User
      this._dataSharingService.isUserLoggedIn.next(true); // Sets Login Boolean in DataSharingService to true
      localStorage.setItem('guest', 'true');
    })
  }

  logoutUser(){
    let observable = this._httpService.logout();
    observable.subscribe(data => {
      console.log("Logged Out User");
    })
  }

  runJquery(){
    $(document).ready(function(){

      // Main Nav Hover Effects
      $('.nav_btn').hover(
          function(){
            if($(this).hasClass('active') != true){
              $(this).css('border-bottom', '0 solid #ff0').animate({borderWidth: 4}, 200);
            }
            $(this).find('p').css('color', 'rgb(228, 226, 226)');
            // Login/Register Btn
            $(this).find('#login_icon').attr('src', '/assets/img/user_icon_light.png');
            $(this).find('#login_icon').animate({height: '50%'},200);
          },
          function(){
            if($(this).hasClass('active') != true){
              $(this).animate({borderWidth: 0}, 200);
            }
            $(this).find('p').css('color', 'rgb(175, 174, 174)');
            // Login/Register Btn
            $(this).find('#login_icon').attr('src', '/assets/img/user_icon_dark.png');
            $(this).find('#login_icon').animate({height: '45%'},200);
          }
      );
  
      // Logout Hover Effect
      $('header').on("mouseenter", ".nav_logout", function() {
        $(this).children().css('border-bottom', '0 solid #ff0').animate({borderWidth: 4}, 200);
        $(this).find('p').css('color', 'rgb(228, 226, 226)');
        
        $('#login_icon').attr('src', '/assets/img/user_icon_light.png');
        $('#login_icon').animate({height: '50%'},200);
      });
      $('header').on("mouseleave", ".nav_logout", function() {
        $(this).children().animate({borderWidth: 0}, 200);
        $(this).find('p').css('color', 'rgb(175, 174, 174)');
  
        $('#login_icon').attr('src', '/assets/img/user_icon_dark.png');
        $('#login_icon').animate({height: '45%'},200);
      });
  
      // Set Active Link Class On Page Load
      var location = window.location.pathname.replace('/','');
        $('.nav_btn').removeClass('active');
        $('#' + location).addClass('active');
      
      // Set Active Link Class On Click
      $('.nav_btn').on('click',function(){
        if($(this).hasClass('active') != true){
          $('.active').animate({borderWidth: 0}, 200);
        }
        $('.nav_btn').removeClass('active');
        $(this).addClass('active');
      });   

    })
  }

}
