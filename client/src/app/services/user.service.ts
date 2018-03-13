import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../api/src/shared/models/User";
import {map, merge, share, startWith, switchMap, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {COOKIE_NAME} from "../../../../api/src/shared/models/Constants";

@Injectable()
export class UserService {

  private _baseUrl : string  = environment.apiUrl;

  userIsLoggedIn$ : Observable<boolean>;

  private loginRequest$ : Subject<any> = new Subject<any>();
  private logoutRequest$ : Subject<any> = new Subject<any>();
  private userLoggedIn$ : Observable<boolean>;
  private userLoggedOut$ : Observable<boolean>;

  constructor(private  _httpClient : HttpClient) {
    this.userLoggedIn$ = this.loginRequest$.pipe(
      switchMap(body =>
        this._httpClient.post<User>(this._baseUrl + "login", body ,{withCredentials:true}).pipe(
          map(value => {
            if(value.id){
              return true;
            } else {
              return false;
            }
          })
        )
      ),
      share()
    );

    this.userLoggedOut$ = this.logoutRequest$.pipe(
      switchMap(_ =>
        this._httpClient.get<boolean>(this._baseUrl+"logout",{withCredentials:true})
      ),
      share()
    );

    this.userIsLoggedIn$ = this.userLoggedIn$.pipe(
      merge(this.userLoggedOut$.pipe(
        map(value => !value)
      )),
      startWith(document.cookie.indexOf(COOKIE_NAME) >= 0),
      tap(_ => console.log("log:" + _))
    );
  }

  login(username:string, password:string, remeber: boolean) {
    this.loginRequest$.next({username:username, password: password, remember: remeber});
  }


  logout() {
    this.logoutRequest$.next( "logout");
  }

  getPronostiek() : Observable<any> {
    return this._httpClient.get(this._baseUrl + "pronostiek", {withCredentials:true});
  }

}
