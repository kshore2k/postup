import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends-profile',
  templateUrl: './friends-profile.component.html',
  styleUrls: ['./friends-profile.component.css']
})
export class FriendsProfileComponent implements OnInit {
  friendId: any; 
  friend: any;
  userId: any;
  friendAdded: Boolean;
  msg: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getAuth();
    this._route.params.subscribe(params => {
      this.friendId = params.id;
      this.getFriendProfileFromService();
    })
  }

  getFriendProfileFromService(){
    let observable = this._httpService.getOneUser(this.friendId);
    observable.subscribe(data => {
      console.log("Fetching Friend");
      this.friend = data;
    })
  }

  addToFriendsList(){
    let observable = this._httpService.addFriend(this.userId,this.friendId);
    observable.subscribe(data => {
      console.log("Added Friend", data);
      this.friendAdded = true;
      this.msg = "Added To Friends List!"
    })
  }

  getAuth(){
    let observable = this._httpService.authenticate();
    observable.subscribe(data => {
      console.log("Getting Authentication", data);
      if(data['msg']==="True"){
        this.userId = data['user_id'];
        this.isFriended();
      }
    })
  }

  // CHECK IF FRIEND IS ALREADY ADDED IF SO DISABLE ADD BUTTON
  isFriended(){
    let observable = this._httpService.getFriends(this.userId);
    observable.subscribe(data => {
      for(var x in data['friends']){
        if(data['friends'][x]['_id']=== this.friendId){
          this.friendAdded = true;
          this.msg = "Is Your Friend!"
        }
        else {
          this.friendAdded = false;
        }
      }
    })
  }
}
