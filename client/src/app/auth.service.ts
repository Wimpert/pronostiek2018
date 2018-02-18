import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class AuthService {

  userIsLoggedIn$ : ReplaySubject<boolean> = new ReplaySubject<boolean>();


  constructor() {
    this.userIsLoggedIn$.next(false);
  }

  toggleLogin()  {
    let value = Math.random() > 0.5;
    this.userIsLoggedIn$.next(value);
  }

}
