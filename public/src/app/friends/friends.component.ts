import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataSharingService } from '../data-sharing.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  // userId: any;
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
    this.getFriendsFromService();
    this.newMessage = {content: ""};
    this._chatService.messages.subscribe(msg => { // Socket Test Console log Message
      // console.log(msg.text);
      this.chatLog.push(JSON.parse(msg.text));
    })
    // this.getAuth();
  }

  // getAuth(){
  //   let observable = this._httpService.authenticate();
  //   observable.subscribe(data => {
  //     console.log("Getting Authentication", data);
  //     if(data['msg']==="True"){
  //       this.userId = data['user_id'];
  //       this.getFriendsFromService();
  //     }
  //   })
  // }

  getFriendsFromService(){
    if(this.isUserLoggedIn){
      let observable = this._httpService.getFriends(this.user._id);
      observable.subscribe(data => {
        console.log("Fetched Friends", data);
        this.friends = data['friends'];
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
    this._chatService.sendMsg(this.user.username + ": " + this.newMessage.content); // Send Message Function through Chat Service
    this.newMessage = {content: ""};
  }

}
