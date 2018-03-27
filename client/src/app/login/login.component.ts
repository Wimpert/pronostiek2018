import {Component, OnDestroy} from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {SignUpDialogComponent} from "../signup/signup.component";
import {UserService} from "../services/user.service";
import {onErrorResumeNext, tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {


  username : string;
  password: string;
  remember: boolean = false;

  subscribtion;




  constructor(public dialogRef: MatDialogRef<SignUpDialogComponent>, public userService: UserService) {
   this.subscribtion =  this.userService.userIsLoggedIn$.pipe(
      tap(value => {
        if(value) {
          this.dialogRef.close();
        }
      }),
     onErrorResumeNext()
    ).subscribe();



  }


  login(){
    this.userService.login(this.username, this.password, this.remember);
  }



  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
