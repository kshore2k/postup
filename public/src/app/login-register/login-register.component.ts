import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  login_user: any;
  flash: any;
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.login_user = {email: "", password: ""};
  }

  checkLogin(){
    let observable = this._httpService.login(this.login_user);
    observable.subscribe(data => {
      console.log(data);
      this.login_user = {email: "", password: ""};
      if(data['msg']==='Logged In User'){
        this._httpService.loggedIn_username = data['info']['username'];
        this._httpService.loggedIn_user_id = data['info']['_id'];
        console.log('Loggin in User: ', this._httpService.loggedIn_username);
        console.log('Loggin in User ID: ', this._httpService.loggedIn_user_id);
        this._router.navigate(['/dashboard']);
      }
      else {
        this.flash = data['msg'];
        console.log(this.flash);
      }
    })
  }

}
