import {Component,OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SignUpDialogComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {ProfileService} from "./services/profile.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit{


  title = 'Pronostiek';


  constructor(public  loginService : UserService, private matDialog : MatDialog , private _profileService : ProfileService){
  }

  ngOnInit(): void {}

  openLoginDialog() {
    let loginDialogRef = this.matDialog.open(LoginComponent, {
      width: 'auto',
      height: 'auto',
      maxWidth: '80%',
      maxHeight: '80%',
      minWidth: '300px'
    });
  }

 openSignupDialog(): void {
    let signUpdialogRef = this.matDialog.open(SignUpDialogComponent, {
      width: 'auto',
      height: 'auto',
      maxWidth: '80%',
      maxHeight: '80%',
      minWidth: '300px'
    });
  }


}




