import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-friends-profile',
  templateUrl: './friends-profile.component.html',
  styleUrls: ['./friends-profile.component.css']
})
export class FriendsProfileComponent implements OnInit {
  // friendId: any;
  friend: any;
  // userId: any;
  isUserLoggedIn: boolean;
  user: any;
  friendAdded: Boolean;
  msg: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _dataSharingService: DataSharingService) {
    this._dataSharingService.isUserLoggedIn.subscribe( value => { // Subscribe to Login Boolean in DataSharingService
      this.isUserLoggedIn = value;
    })
    
    this._dataSharingService.loggedInUser.subscribe( value => {  // Subscribe to User Data Saved in DataSharingService
      this.user = value;
    })
   }

  ngOnInit() {
    
    this._route.params.subscribe(params => {
      // this.friendId = params.id;
      // this.getAuth();
      this.getFriendProfileFromService(params.id);
      // this.isFriended();
    })
  }

  getFriendProfileFromService(id){
    let observable = this._httpService.getOneUser(id);
    observable.subscribe(data => {
      console.log("Fetching Friend");
      this.friend = data;
      this.isFriended();
    })
  }

  addToFriendsList(){
    let observable = this._httpService.addFriend(this.user._id,this.friend._id);
    observable.subscribe(data => {
      console.log("Added Friend", data);
      this.friendAdded = true;
      this.msg = "Added To Friends List!"
    })
  }

  // getAuth(){
  //   let observable = this._httpService.authenticate();
  //   observable.subscribe(data => {
  //     console.log("Getting Authentication", data);
  //     if(data['msg']==="True"){
  //       this.userId = data['user_id'];
  //       this.isFriended();
  //     }
  //   })
  // }

  // CHECK IF FRIEND IS ALREADY ADDED IF SO DISABLE ADD BUTTON
  isFriended(){
    if(this.isUserLoggedIn){
      let observable = this._httpService.getFriends(this.user._id);
      observable.subscribe(data => {
        for(var x in data['friends']){
          if(data['friends'][x]['_id'] === this.friend._id){
            this.friendAdded = true;
            this.msg = "Is Your Friend!"
          }
          // else {
          //   this.friendAdded = false;
          // }
        }
      })
    }
    
  }
}
