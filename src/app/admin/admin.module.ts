import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatTableModule} from '@angular/material/table';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './service/admin.service';
import { EditAddUserComponent } from './edit-add-user/edit-add-user.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    EditAddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    MatPaginatorModule
  ],
  providers:[AdminService]
})
export class AdminModule { }
