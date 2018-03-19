import {Component, OnDestroy} from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {SignUpDialogComponent} from "../signup/signup.component";
import {UserService} from "../services/user.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {


  username : string;
  password: string;
  remember: boolean = false;

  subscribtion ;




  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>, public _userService: UserService) {
   this.subscribtion =  this._userService.userIsLoggedIn$.pipe(
      tap(value => {

        if(value) {
          this.dialogRef.close();
        }
      })
    ).subscribe();
  }


  login(){
    this._userService.login(this.username, this.password, this.remember);
  }



  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
