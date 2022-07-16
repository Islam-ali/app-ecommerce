import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly API = environment._Api
  user = new BehaviorSubject<any>('');
  button = new BehaviorSubject<string>('');
  constructor(private _HttpClient:HttpClient) { }
  getUserInfo(user:any,button:string){
    this.user.next(user)
    this.button.next(button)
  }
  getAllUsers():Observable<any>{
    return this._HttpClient.get(`${this.API}users`).pipe(
      catchError(this.handleError)
    )
  }
  updateUsers(id:number,body:any):Observable<any>{
    return this._HttpClient.put(`${this.API}users/${id}`,body).pipe(
      catchError(this.handleError)
    )
  }
  addUsers(body:any):Observable<any>{
    return this._HttpClient.post(`${this.API}users`,body).pipe(
      catchError(this.handleError)
    )
  }
  deleteUser(id:number):Observable<any>{
    return this._HttpClient.delete(`${this.API}users/${id}`).pipe(
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
