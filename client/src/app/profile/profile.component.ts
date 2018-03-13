import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../api/src/shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../utils/utils";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;
  confirmPassword : String;
  @Output() canceled = new EventEmitter();
  @Output() userUpdated = new EventEmitter<User>();
  profileFormGroup: FormGroup;

  constructor(private _formBuilder : FormBuilder, private _userService : UserService) {
  }

  ngOnInit() {
    this.createForm();
    //copy the value:
    this.confirmPassword = this.user !== undefined ? this.user.password : undefined;
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

  onSubmit() : void {

    this._userService.createUser(this.user)
      .subscribe(value => console.log(value));
    //this.userUpdated.emit(this.user);
  }



}
