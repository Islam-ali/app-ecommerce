import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  lengthCart$ = new BehaviorSubject<number>(0);
  currentLengthCart$ = this.lengthCart$.asObservable();
  users$ = new BehaviorSubject<any>('')
  constructor() { }

  getLengthCart(){
    let cart = JSON.parse(localStorage.getItem('cart')!);
    this.lengthCart$.next(cart?.length);
  }
  getUsersLocalStorage(){
    let users = JSON.parse(localStorage.getItem('users')!);
    this.users$.next(users)
  }
}
