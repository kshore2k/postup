import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { DataSharingService } from './data-sharing.service';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isUserLoggedIn: boolean;
  user: any;
  
  constructor(private _httpService: HttpService, private _dataSharingService: DataSharingService, private _router: Router, private _chatService: ChatService){
    this._dataSharingService.isUserLoggedIn.subscribe( value => { // Subscribe to Login Boolean in DataSharingService
      this.isUserLoggedIn = value;
    })
    
    this._dataSharingService.loggedInUser.subscribe( value => {  // Subscribe to User Data Saved in DataSharingService
      this.user = value;
    })
    
  }

  ngOnInit(){
  }

  logoutUser(){
    let observable = this._httpService.logout();
    observable.subscribe(data => {
      console.log("Logged Out User");
      this._router.navigate(['/dashboard']);
    })
  }

}
