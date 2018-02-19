import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../api/src/shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../utils/utils";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;
  profileFormGroup: FormGroup;

  constructor(private _formBuilder : FormBuilder) {
  }

  ngOnInit() {
    this.createForm()
  }

  private createForm() : void {
    this.profileFormGroup = this._formBuilder.group({
      firstNameFormControl : ['', Validators.required],
      lastNameFormControl : ['', Validators.required],
      userNameFormControl :  ['', Validators.required],
      emailFormControl : ['', Validators.email],
      passwordFormControl : ['', Validators.required],
      confirmPasswordFormControl : ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

}
