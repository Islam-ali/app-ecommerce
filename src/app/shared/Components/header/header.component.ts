import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  badgeCart!:number;
  isLogin!:boolean;
  isAdmin!:boolean;
  constructor(private _SharedService:SharedService,private _AuthGuard:AuthGuard,private router:Router) { 
    this.checkLogin();
  }

  ngOnInit(): void {
    this.LengthCart();
  }
  LengthCart(){
    this._SharedService.getLengthCart();
    this._SharedService.currentLengthCart$.subscribe((res:any) => {
      this.badgeCart = res
    })
  }
  checkLogin(){
    this._AuthGuard.isLogin.subscribe((res:any)=>{
      this.isLogin = res
    })
    this._AuthGuard.token.subscribe((res:any)=>{
      if(res == 'admin'){
        this.isAdmin = true
      }else{
        this.isAdmin = false
      }
    })
  }
  logOut(){
    localStorage.removeItem('token')
    this._AuthGuard.isLogin.next(false)
    this.router.navigate(['/auth/login']);
  }
}
