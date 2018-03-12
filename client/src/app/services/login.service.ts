import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../api/src/shared/models/User";

@Injectable()
export class LoginService {

  private _baseUrl : string  = environment.apiUrl;

  constructor(private  _httpClient : HttpClient) { }

  login(username:string, password:string, remeber: boolean) : Observable<User>{
    return this._httpClient.post<User>(this._baseUrl + "login",{username:username,password:password, remember: remeber},{withCredentials:true});
  }

}
