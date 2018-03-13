import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Component, Inject, ViewChild} from "@angular/core";
import {User} from "../../../../api/src/shared/models/User";
import {ProfileService} from "../services/profile.service";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'sign-up-dialog',
  templateUrl: 'sign-up-dialog.html',
  styleUrls: ['signup.component.scss']
})
export class SignUpDialogComponent {

  @ViewChild(ProfileComponent) private profileComponent : ProfileComponent;
  user: User;

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private profileService : ProfileService) {
    this.user = new User();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  userSaveSuccessfully(user : User): void {
    console.log("this is the new user: ");
    console.log(user);
    this.close();
  }

}
