import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuth();
  }

  getAuth(){
    let observable = this._httpService.authenticate();
    observable.subscribe(data => {
      console.log("Getting Authentication", data);
      if(data['msg']==="True"){
        this.getProfile(data['user_id']);
      }
    })
  }

  getProfile(id){
    let observable = this._httpService.getOneUser(id);
    observable.subscribe(data => {
      console.log("Profile Fetched", data);
      this.user = data;
    })
  }

}
