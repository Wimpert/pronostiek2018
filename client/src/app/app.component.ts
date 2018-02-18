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


  constructor(private authService : AuthService, private signUpDialog : MatDialog){}

  fakeLogin() {
    this.authService.toggleLogin();
  }

 openDialog(): void {
    let dialogRef = this.signUpDialog.open(SignUpDialogComponent, {
      width: '80%',
      height: '80%',
      maxWidth: '500px',
      maxHeight: '500px',
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
})
export class SignUpDialogComponent {

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    console.log("here");
    this.dialogRef.close();
  }

}


