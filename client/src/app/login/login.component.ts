import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {User} from "../../../../api/src/shared/models/User";
import {SignUpDialogComponent} from "../signup/signup.component";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>) {

  }

  ngOnInit() {
  }

}
