import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService {

  private _baseUrl : string  = environment.apiUrl;

  constructor() { }

}
