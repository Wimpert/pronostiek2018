import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class ProfileService {

  private _baseUrl : string  = environment.apiUrl

  constructor(private _http: HttpClient) {}

  createProfile() : void {
    console.log(this._baseUrl);
  }

}
