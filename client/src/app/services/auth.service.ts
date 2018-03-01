import {Injectable, OnInit} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {browser} from "protractor";

@Injectable()
export class AuthService {


  userIsLoggedIn$ : ReplaySubject<boolean> = new ReplaySubject<boolean>();



  constructor() {
    console.log(document);
    console.log(document.cookie);
    document.cookie = "wim=hello";
    console.log(document.cookie);
    this.userIsLoggedIn$.next(false);
  }

  toggleLogin()  {
    let value = Math.random() > 0.5;
    this.userIsLoggedIn$.next(value);
  }

}
