import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../../api/src/shared/models/User";
import {SignUpDialogComponent} from "../signup/signup.component";
import {ProfileService} from "../services/profile.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {


  username : string;
  password: string;
  private _loginSubscribtion;

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>, private _loginService: LoginService) {}


  login() : void {
    this._loginSubscribtion =  this._loginService.login(this.username, this.password)
      .subscribe(value => console.log(value));
  }

  ngOnDestroy(): void {
    if(this._loginSubscribtion){
      this._loginSubscribtion.unsubscribe();
    }
  }

}
