import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  user:any[]=[];
  loading:boolean=false;
  registerForm!: FormGroup
  constructor(private _FormBuilder: FormBuilder,private _AdminService:AdminService,private toastr:ToastrService,private router:Router) {
    let users = JSON.parse(localStorage.getItem('users')!)
    this.registerForm = this._FormBuilder.group({
      id:users? users.length + 1 : 11,
      email: ['',[Validators.email,Validators.required]],
      username: ['',[Validators.minLength(3),Validators.required]],
      password:['',[Validators.minLength(6),Validators.required]],
      phone:['',Validators.required],
      name: this._FormBuilder.group({
        firstname: ['',Validators.required],
        lastname: ['',Validators.required]
      }),
      address: {
        city: 'kilcoole',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        }
      },
    })
  }

  ngOnInit(): void {
  }
  get f()
  {
    return this.registerForm.controls;
  }
  submitRegister(form:FormGroup){
    this.loading =true
    if(form.valid){
      this._AdminService.addUsers(form.value).subscribe({
        next: (res:any)=>{
        this.loading = false;
          if(!this.user){
            this.user= []
          }
          this.user.push(form.value)
          // let users = JSON.parse(localStorage.getItem('users')!)
          // users.push(form.value)
          // localStorage.setItem('users', JSON.stringify(users)); 
          this.user.sort((a, b) => a.id - b.id)
          localStorage.setItem('user', JSON.stringify(this.user)); 
          this.toastr.success('This is a success Register', 'Success')
          this.router.navigate(['auth/login'])
        },
        error: (err:any)=>{
          this.loading = false;
          this.toastr.error(err.error, 'Error')
        }
      })
    }

  }
}
