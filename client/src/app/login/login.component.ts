import {Component, OnDestroy} from '@angular/core';
import { MatDialogRef} from "@angular/material";
import {SignUpDialogComponent} from "../signup/signup.component";
import {LoginService} from "../services/login.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {switchMap, tap, map} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {


  username : string;
  password: string;
  remember: boolean = false;

  _loginSubscribtion : Observable<boolean>;
  private  _loginButton$ = new Subject<string>();


  constructor(  public dialogRef: MatDialogRef<SignUpDialogComponent>, private _loginService: LoginService) {

    this._loginSubscribtion = this._loginButton$.pipe(
      switchMap(_ => this._loginService.login(this.username, this.password, this.remember)),
      tap(user => console.log(user)),
      map(user => {
        if(user){
          return user.id != undefined;
        }
        return false;
      }),
      tap(val => console.log("val: " + val))
    );
  }


  login(){
    this._loginButton$.next("clicked");
  }



  ngOnDestroy(): void {

  }

}
