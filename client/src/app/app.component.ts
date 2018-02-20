import {Component, Inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from "../../../api/src/shared/models/User";
import {SignUpDialogComponent} from "./signup/signup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Pronostiek';
  user : User


  constructor(public  authService : AuthService, private signUpDialog : MatDialog){
    this.user = new User();
    this.user.username = "wimpert";
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
      data: { user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
    });
  }
}




