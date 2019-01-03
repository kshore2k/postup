import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private _httpService: HttpService, private _router: Router) { }

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

}
