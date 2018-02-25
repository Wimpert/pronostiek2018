import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../../../../api/src/shared/models/User";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProfileService {

  private _baseUrl : string  = environment.apiUrl;


  constructor(private _http: HttpClient) {}

  createProfile(user: User) : Observable<any> {
     return this._http.post(this._baseUrl+"signup",user);
  }

  getProfile() : Observable<any> {
    return this._http.get(this._baseUrl+"profile", {withCredentials:true});
  }

}
