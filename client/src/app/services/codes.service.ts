import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CodesService {

  private _baseUrl : string  = environment.apiUrl;

  constructor(private  _httpClient : HttpClient) {}

 
 getAllCodes(): Observable<any>{
    return this._httpClient.get(this._baseUrl+'keys', {withCredentials: true});
  }
}
