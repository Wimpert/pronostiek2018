import {Injectable, OnInit} from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {browser} from "protractor";

@Injectable()
export class AuthService {


  userIsLoggedIn$ : ReplaySubject<boolean> = new ReplaySubject<boolean>();



  constructor( ) {
    const cookies : string  = document.cookie;
    const startValue : boolean = cookies.indexOf("uid=") >= 0;
    this.userIsLoggedIn$.next(startValue);
   // this.userIsLoggedIn$ =
  }

  emitUserLoggedInEvent()  {

  }

}
