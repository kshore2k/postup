import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  username: any;

  constructor(private _httpService: HttpService, private _router: Router){}

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
