import {Component, OnDestroy} from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {SignUpDialogComponent} from "../signup/signup.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {


  username : string;
  password: string;
  remember: boolean = false;


  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>, private _loginService: UserService) {
  }


  login(){
    this._loginService.login(this.username, this.password, this.remember);
  }



  ngOnDestroy(): void {

  }

}
