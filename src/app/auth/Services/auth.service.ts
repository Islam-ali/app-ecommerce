import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AuthURL = environment._Api;
  constructor(private _HttpClient:HttpClient) { }
  
  addUser(user:any) :Observable<any>{
    return this._HttpClient.post(`${this.AuthURL}users`,user).pipe(
      catchError(this.handleError)
    )
  }
  getAllUser() :Observable<any>{
    return this._HttpClient.get(`${this.AuthURL}users`).pipe(
      catchError(this.handleError)
    )
  }
  loginUser(user:any) :Observable<any>{
    return this._HttpClient.post(`${this.AuthURL}auth/login`,user).pipe(
      catchError(this.handleError)
    )
  }





//****************  HandleError ***************//
//** We Can make another Solution in Error Interceptor */

handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(() =>
    error.error);
};

}
