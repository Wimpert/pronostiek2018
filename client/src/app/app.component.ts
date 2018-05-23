import {Component,OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SignUpDialogComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {UserService} from "./services/user.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {map, shareReplay, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit{

  showWelcome$ : Observable<boolean>;
  showSignup = false;

  constructor(public  _userService : UserService, private matDialog : MatDialog ){}

  ngOnInit(): void {
    this.showWelcome$ = this._userService.userIsLoggedIn$.pipe(
     map(value => ! value)
    );
  }

  openLoginDialog() {
    // let loginDialogRef =
      this.matDialog.open(LoginComponent, {
      width: 'auto',
      height: 'auto',
      maxWidth: '80%',
      maxHeight: '80%',
      minWidth: '300px'
    });
  }

 openSignupDialog(): void {
   this.showSignup = true;
    // let signUpdialogRef =
    //   this.matDialog.open(SignUpDialogComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   maxWidth: '80%',
    //   maxHeight: '100%',
    //   minWidth: '300px'
    // });
  }

  closeSignUp() : void {
    this.showSignup = false;
  }


}




