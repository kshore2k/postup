import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataSharingService } from '../data-sharing.service';
import { ChatService } from '../chat.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  isUserLoggedIn: boolean;
  user: any;
  friends: any;
  chat = false;
  chatLog: Array<string> = [];
  newMessage: any;

  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService, private _chatService: ChatService) {
    this._dataSharingService.isUserLoggedIn.subscribe( value => { // Subscribe to Login Boolean in DataSharingService
      this.isUserLoggedIn = value;
    })

    this._dataSharingService.loggedInUser.subscribe( value => {  // Subscribe to User Data Saved in DataSharingService
      this.user = value;
    })
   }

  ngOnInit() {
    this.runJquery();
    this.getFriendsFromService();
    this.newMessage = {content: ""};
    this._chatService.messages.subscribe(msg => { // Socket Test Console log Message
      this.chatLog.push(JSON.parse(msg.text));
      $('.chatbox').animate({scrollTop: $('.chatbox').get(0).scrollHeight}, 2000); // Auto Scroll .chatbox Div On New Message
    })
  }

  getFriendsFromService(){
    if(this.isUserLoggedIn){
      let observable = this._httpService.getFriends(this.user._id);
      observable.subscribe(data => {
        console.log("Fetched Friends", data);
        if(data != null){
          this.friends = data['friends'];
        }
      })
    }
  }

  removeFromFriendsList(friendId){
    let observable = this._httpService.removeFriend(this.user._id,friendId);
    observable.subscribe(data => {
      console.log("Friend Removed", data);
      this.getFriendsFromService();
    })
  }

  startChat(){
    this.chat = true;
  }

  endChat(){
    this.chat = false;
  }

  sendMessage(){
    if(this.newMessage.content != ""){
      this._chatService.sendMsg(this.user.username + ": " + this.newMessage.content); // Send Message Function through Chat Service
      this.newMessage = {content: ""};
    }
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
