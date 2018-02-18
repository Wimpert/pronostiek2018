import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class AuthService {

  userIsLoggedIn$ : ReplaySubject<boolean> = new ReplaySubject<boolean>();


  constructor() {
    this.userIsLoggedIn$.next(false);
  }

  toggleLogin()  {
    console.log("tggling");
    var value = Math.random() > 0.5;
    console.log(value);
    this.userIsLoggedIn$.next(value);
  }

}
