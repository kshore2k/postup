import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { DataSharingService } from './data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  username: any;
  isUserLoggedIn: boolean;

  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService, private _router: Router){
    this._dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    })
  }

  ngOnInit(){
    this.getAuth();
  }

  getAuth(){
    let observable = this._httpService.authenticate();
    observable.subscribe(data => {
      console.log("Getting Authentication", data);
      if(data['msg']==="True"){
        this.username = data['username'];
      }
    })
  }

  logoutUser(){
    let observable = this._httpService.logout();
    observable.subscribe(data => {
      console.log("Logged Out User");
      this._router.navigate(['/dashboard']);
    })
  }

}
