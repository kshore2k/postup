import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  editProfile: any;
  userId: any;
  confirmation: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.editProfile = {new_password: ""};
    this._route.params.subscribe(params => this.userId = params.id)
  }

  // POSSIBLY CHECK IF USER EXISTS / AUTHENTICATION? ****
  setNewPassword(){
    let observable = this._httpService.changePassword(this.userId,this.editProfile);
    observable.subscribe(data => {
      console.log("Password Changed", data);
      let observable = this._httpService.logout();
      observable.subscribe(data => {
        console.log(data['msg']);
        this.confirmation = "Password Successfully Changed! Please Log Back In!";
      })
    })
  }

}
