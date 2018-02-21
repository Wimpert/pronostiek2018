import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../../../../api/src/shared/models/User";

@Injectable()
export class ProfileService {

  private _baseUrl : string  = environment.apiUrl;


  constructor(private _http: HttpClient) {}

  createProfile(user: User) : void {
    this._http.post(this._baseUrl+"signup",user).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

}
