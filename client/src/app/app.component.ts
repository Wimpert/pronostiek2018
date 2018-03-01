import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from "../../../api/src/shared/models/User";
import {SignUpDialogComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {ProfileService} from "./services/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit{


  title = 'Pronostiek';


  constructor(public  authService : AuthService, private matDialog : MatDialog , private _profileService : ProfileService){
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

   /*signUpdialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }

  get() : void{
    this._profileService.getProfile()
      .subscribe(value => console.log(value));
  }


}




