import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EditAddUserComponent } from '../edit-add-user/edit-add-user.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = ['id' , 'username' , 'email' , 'password' , 'edit' , 'delete' ];
  users:any[]=[];
  dataSource!: MatTableDataSource<any>;
  loading:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private _AdminService:AdminService,private toastr: ToastrService , private _SharedService:SharedService) {
  }
  ngOnInit(){
  }  
  ngAfterViewInit() {
    setTimeout(() =>{
      this.getAllUser();
    })
  }
  getAllUser(){
    this.loading =true
    if('users' in localStorage)
    {
      this._SharedService.getUsersLocalStorage();
      this._SharedService.users$.subscribe((res:any)=>{
        this.loading = false;
        this.users = res
        if('user' in localStorage){
          let userRegister = JSON.parse(localStorage.getItem('user')!)
          this.users.push(userRegister[0])
          localStorage.setItem('users', JSON.stringify(this.users));
          localStorage.removeItem('user')
        }
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }else{
      this._AdminService.getAllUsers().subscribe({
        next:(res:any)=>{
          this.loading = false;
          localStorage.setItem('users',JSON.stringify(res))
          this._SharedService.getUsersLocalStorage();
          this.users = res
          if('user' in localStorage){
            let userRegister = JSON.parse(localStorage.getItem('user')!)
            this.users.push(userRegister[0])
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.removeItem('user')
          }
          this._SharedService.users$.subscribe((res:any)=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        },
        error:(err:any)=>{this.loading = false;}
      })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteUser(id:number){
    this.loading = true;
    this._AdminService.deleteUser(id).subscribe({
      next: (res:any)=>{
        this.users = this._SharedService.users$.value
        this.users.splice(this.users.findIndex(item => item.id == id),1)
        localStorage.setItem('users', JSON.stringify(this.users));
        this._SharedService.getUsersLocalStorage();
        this.loading = false;
        this.toastr.warning('This is a success delete user', 'Done')
      },
      error: (err:any)=>{
        this.loading = false;
        this.toastr.error(err.error, 'Error')
      }
    })
  }
  sendUser(user:any,button:string){
    this._AdminService.getUserInfo(user,button)
  }
  openDialog() {
    this.dialog.open(EditAddUserComponent);
  }

}
