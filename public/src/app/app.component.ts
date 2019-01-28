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
  }

  logoutUser(){
    let observable = this._httpService.logout();
    observable.subscribe(data => {
      console.log("Logged Out User");
      this._router.navigate(['/dashboard']);
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
  
      // Set Home as Initial Active Link Class
      var location = window.location.pathname;
      if(location == '/dashboard'){
        $('.nav_btn').removeClass('active');
        $('#home').addClass('active');
      };
      
      // Set Active Link Class
      $('.nav_btn').click(function(){
        if($(this).hasClass('active') != true){
          $('.active').animate({borderWidth: 0}, 200);
        }
        $('.nav_btn').removeClass('active');
        $(this).addClass('active');
      });   
    })
  }

}
