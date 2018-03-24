import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../api/src/shared/models/User";
import {map, merge, share, shareReplay, startWith, switchMap, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {COOKIE_NAME} from "../../../../api/src/shared/models/Constants";
import {Pronostiek} from "../../../../api/src/shared/models/pronostiek/Pronostiek";

@Injectable()
export class UserService {

  private _baseUrl : string  = environment.apiUrl;

  userIsLoggedIn$ : Observable<boolean>;

  private loginRequest$ : Subject<any> = new Subject<any>();
  private logoutRequest$ : Subject<any> = new Subject<any>();
  private userCreateRequest$ :Subject<User> = new Subject<User>();
  private userLoggedIn$ : Observable<boolean>;
  private userLoggedOut$ : Observable<boolean>;
  private userCreated$ : Observable<boolean>;
  private unauthorizedResponse$ :  Subject<boolean> = new Subject<boolean>();

  constructor(private  _httpClient : HttpClient) {
    this.userLoggedIn$ = this.loginRequest$.pipe(
      switchMap(body =>
        this._httpClient.post<User>(this._baseUrl + "login", body ,{withCredentials:true}).pipe(
          map(value => {
            return value.id !== undefined;
          })
        )
      ),
      share()
    );

    this.userCreated$ = this.userCreateRequest$.pipe(
      switchMap(user =>
        this._httpClient.post<User>(this._baseUrl+"signup",user).pipe(
          map(user => {
            return user.id !== undefined;
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
      merge(this.userCreated$),
      merge(this.unauthorizedResponse$.pipe(
        map(value => !value)
      )),
      startWith(document.cookie.indexOf(COOKIE_NAME) >= 0),
      shareReplay(1)
      //tap(value => {console.log("isloggedin: " + value)})
    );
  }

  login(username:string, password:string, remeber: boolean) {
    this.loginRequest$.next({username:username, password: password, remember: remeber});
  }

  logout() {
    this.logoutRequest$.next( "logout");
  }

  getPronostiek() : Observable<Pronostiek> {
    return this._httpClient.get<Pronostiek>(this._baseUrl + "pronostiek", {withCredentials:true});
  }

  savePronostiek(pronostiek : Pronostiek) : Observable<Pronostiek> {
    console.log("saving:");
    console.log(pronostiek);
    return this._httpClient.post<Pronostiek>(this._baseUrl+"pronostiek" , pronostiek , {withCredentials:true});
  }

  createUser(user: User) {
    this.userCreateRequest$.next(user);
  }

  handle401() {
    console.log("hi");
    this.unauthorizedResponse$.next(true);
  }

}
