import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LoginService {

  private _baseUrl : string  = environment.apiUrl;

  constructor(private  _httpClient : HttpClient) { }

  login(username:string, password:string) : void{
    this._httpClient.post(this._baseUrl + "login",{username:username,password:password})
      .subscribe(value =>{console.log(value);});
  }

}
