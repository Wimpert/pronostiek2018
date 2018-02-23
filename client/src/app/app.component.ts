import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from "../../../api/src/shared/models/User";
import {SignUpDialogComponent} from "./signup/signup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit{


  title = 'Pronostiek';


  constructor(public  authService : AuthService, private signUpDialog : MatDialog){
  }

  ngOnInit(): void {
    this.openDialog();
  }

  fakeLogin() {
    this.authService.toggleLogin();
  }

 openDialog(): void {
    let dialogRef = this.signUpDialog.open(SignUpDialogComponent, {
      width: 'auto',
      height: 'auto',
      maxWidth: '80%',
      maxHeight: '80%',
      minWidth: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}




