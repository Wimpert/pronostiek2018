import {Component, Inject, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit {

  username : string;
  password: string;

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>, private _loginService: LoginService) {}

  ngOnInit() {
  }

  login() : void {
    this._loginService.login(this.username, this.password);
  }

}
