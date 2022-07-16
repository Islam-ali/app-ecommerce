import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogin = new BehaviorSubject(false);
  token = new BehaviorSubject('')
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token.next(localStorage.getItem('token')!)
    if(this.token.value){
      this.isLogin.next(true)
      return true
    }
      this.router.navigate(['/auth/login']);
      this.isLogin.next(false);
      return false;
    
  }
  
}
