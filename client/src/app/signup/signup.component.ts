import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Component, Inject} from "@angular/core";
import {User} from "../../../../api/src/shared/models/User";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'sign-up-dialog',
  templateUrl: 'sign-up-dialog.html',
  styleUrls: ['signup.component.scss']
})
export class SignUpDialogComponent {

  user : User ;

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private profileService : ProfileService) {
    this.user = data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  signUp(): void {
    console.log(this.profileService);
    this.profileService.createProfile();
  }

}
