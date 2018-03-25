import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {catchError, tap} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class Interceptor implements HttpInterceptor{

  constructor(private  userSerivce : UserService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
       catchError((err:any) =>{
         if (err instanceof HttpErrorResponse) {
           if (err.status === 401) {
             this.userSerivce.logout();
           }
         }
         return new ErrorObservable(err);
       })
    );

    ;
  }

}
