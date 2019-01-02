import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';

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

  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService, private _router: Router) { }

  ngOnInit() {
    this.loginUser = {email: "", password: ""};
    this.newUser = {first_name: "", last_name: "", email: "", username: "", password: ""};
  }

  checkLogin(){
    let observable = this._httpService.login(this.loginUser);
    observable.subscribe(data => {
      console.log(data);
      this.loginUser = {email: "", password: ""};
      if(data['msg']==='Logged In User'){
        this._dataSharingService.isUserLoggedIn.next(true);
        this._router.navigate(['/dashboard']);
      }
      else {
        this.loginFlash = data['msg'];
        console.log(this.loginFlash);
      }
    })
  }

  // VALIDATIONS NEEDS WORK ***
  registerUser(){
    let observable = this._httpService.createUser(this.newUser);
    observable.subscribe(data => {
      console.log("Created One User", data);
      if(data['errors']){
        console.log(data['errors']);
        this.registerFlash = data['errors'];
      }
      else {
        this._router.navigate(['/dashboard']);
      }
    })
  }

}
