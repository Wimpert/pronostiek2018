import {Component, Inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from "../../../api/src/shared/models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Pronostiek';
  user : User


  constructor(private authService : AuthService, private signUpDialog : MatDialog){
    this.user = new User();
    this.user.username = "wimpert";
  }

  fakeLogin() {
    this.authService.toggleLogin();
  }

 openDialog(): void {
    let dialogRef = this.signUpDialog.open(SignUpDialogComponent, {
      width: 'auto',
      height: '500px',
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

@Component({
  selector: 'sign-up-dialog',
  templateUrl: 'signup/sign-up-dialog.html',
  styleUrls: ['signup/signup.component.scss']
})
export class SignUpDialogComponent {

  user : User ;

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


