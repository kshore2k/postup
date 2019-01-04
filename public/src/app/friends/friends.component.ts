import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  userId: any;
  friends: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuth();
  }

  getAuth(){
    let observable = this._httpService.authenticate();
    observable.subscribe(data => {
      console.log("Getting Authentication", data);
      if(data['msg']==="True"){
        this.userId = data['user_id'];
        this.getFriendsFromService();
      }
    })
  }

  getFriendsFromService(){
    let observable = this._httpService.getFriends(this.userId);
    observable.subscribe(data => {
      console.log("Fetched Friends", data);
      this.friends = data['friends'];
    })
  }

  removeFromFriendsList(friendId){
    let observable = this._httpService.removeFriend(this.userId,friendId);
    observable.subscribe(data => {
      console.log("Friend Removed", data);
      this.getAuth();
    })
  }

}
