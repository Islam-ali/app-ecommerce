import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-edit-add-user',
  templateUrl: './edit-add-user.component.html',
  styleUrls: ['./edit-add-user.component.scss']
})
export class EditAddUserComponent implements OnInit {
  button:string='';
  hide = true;
  userForm!: FormGroup;
  users:any[]=[];
  loading:boolean=false;
  constructor(private _FormBuilder: FormBuilder,private _AdminService:AdminService,private toastr: ToastrService,private _SharedService:SharedService) {
    this.users = JSON.parse(localStorage.getItem('users')!)
    this.userForm = this._FormBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      username: ['',[Validators.minLength(3),Validators.required]],
      password:['',[Validators.minLength(6),Validators.required]],
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
      phone:['',Validators.required],
      id:this.users.length + 1
    })
  }

  ngOnInit(): void {
    this.button = this._AdminService.button.value
    this.contentUser();
  }
  contentUser(){
    let user = this._AdminService.user.value
    if(user){
      this.userForm.patchValue({
        email: user.email,
        username: user.username,
        password: user.password,
        phone: user.phone,
        name:{
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        },
        id: user.id
      })
    }
  }
  addEditUser(form:FormGroup){
    this.loading =true
    if(form.valid && this.button == 'edit'){
      let Id = this._AdminService.user.value.id
        this._AdminService.updateUsers(Id,form.value).subscribe({
          next: (res:any)=>{
            this.users = JSON.parse(localStorage.getItem('users')!)
            let userItem = this.users.findIndex(item => item.id == Id)
            this.users.splice(userItem,1)
            this.users.push(form.value)
            this.users.sort((a, b) => a.id - b.id)
            localStorage.setItem('users', JSON.stringify(this.users));
            this._SharedService.getUsersLocalStorage();
            this.loading = false;
            this.toastr.success('This is a success update user', 'Success')
          },
          error: (err:any)=>{
            this.loading = false;
            this.toastr.error(err.error, 'Error')
          }
        })
    }
    if(form.valid && this.button == 'add'){
      this._AdminService.addUsers(form.value).subscribe({
        next: (res:any)=>{
          this.users = JSON.parse(localStorage.getItem('users')!)
          this.users.push(form.value)
          this.users.sort((a, b) => a.id - b.id)
          localStorage.setItem('users', JSON.stringify(this.users)); 
          this._SharedService.getUsersLocalStorage();
          this.loading = false;
          this.toastr.success('This is a success add user', 'Success')
        },
        error: (err:any)=>{
          this.loading = false;
          this.toastr.error(err.error, 'Error')
        }
      })
    }
  }

}
