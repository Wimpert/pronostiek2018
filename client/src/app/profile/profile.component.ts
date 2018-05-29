import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../api/src/shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../utils/utils";
import {UserService} from "../services/user.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;
  confirmPassword : String;
  @Output() canceled = new EventEmitter();
  @Output() userUpdated = new EventEmitter();
  profileFormGroup: FormGroup;

  constructor(private _formBuilder : FormBuilder,  public userService : UserService) {
    
  }

  ngOnInit() {
    if(this.user === undefined){
      this.user = new User();
    }
    this.createForm();
    this.confirmPassword = this.user !== undefined ? this.user.password : undefined;
  }

  private createForm() : void {
    this.profileFormGroup = this._formBuilder.group({
      firstNameFormControl : ['', Validators.required],
      lastNameFormControl : ['', Validators.required],
      userNameFormControl :  ['', Validators.required],
      emailFormControl : ['', Validators.email],
      passwordFormControl : ['', Validators.required],
      confirmPasswordFormControl : ['', Validators.required],
      codeFormControl : ['',Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSubmit() : void {
    if(this.profileFormGroup.valid){
      this.userService.createUser(this.user,this.profileFormGroup.get('codeFormControl').value);
    }
  }


}
