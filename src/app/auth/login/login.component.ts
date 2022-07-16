import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!:FormGroup;
  message:string | undefined;
  loading:boolean=false;
  admin:any={username:'admin',password:'admin1'}
  constructor(private _FormBuilder: FormBuilder,
    private _AuthService:AuthService,
    private _Router:Router,
    private toastr:ToastrService
    ) {
    this.loginForm = this._FormBuilder.group({
      username: [null,[Validators.minLength(3),Validators.required]],
      password:[null,[Validators.minLength(6),Validators.required]],
    })
   }

  ngOnInit(): void {
  }
  get f()
  {
    return this.loginForm.controls;
  }
  submitLogin(form:FormGroup){
    this.loading =true
    if(form.invalid){
    this.loading =false
      return
    }
    switch(form.valid){
      case 'user' in localStorage && form.value.username != 'admin':{
        let user = JSON.parse(localStorage.getItem('user')!);
        let userItem = user.find((item: any) => [item.username , item.password] )
        if(userItem){
          this.loading =false
          this.toastr.success('This is a success Login', 'Success')
          localStorage.setItem('token','true')
          this._Router.navigate(['/'])
        }
        break;
      }
      case 'users' in localStorage && form.value.username != 'admin':{
        let user = JSON.parse(localStorage.getItem('users')!);
        let userItem = user.find((item: any) => [item.username , item.password] )
        if(userItem){
          this.loading =false
          this.toastr.success('This is a success Login', 'Success')
          localStorage.setItem('token','true')
          this._Router.navigate(['/'])
        }
        break;
      }
      case form.value.username == 'admin' && form.value.password == 'admin1':{
          this.loading =false
          this.toastr.success('This is a success Admin Login', 'Success')
          localStorage.setItem('token','admin')
          this._Router.navigate(['/'])          
        break;
      }
      default:{
        this._AuthService.loginUser(form.value).subscribe({
          next: (res:any)=>{
            this.loading =false
            if(res.token){
            this.toastr.success('This is a success Login', 'Success')
              localStorage.setItem('token',res.token)
              this._Router.navigate(['/'])
            }
          },
          error: (err:any)=>{
            this.loading =false
            this.toastr.error(err, 'Error')
          }
        })
        break;
      }
    }

  }
}
