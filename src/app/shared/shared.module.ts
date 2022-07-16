import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { LoadingComponent } from './Components/loading/loading.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchPipe } from './pipe/search.pipe';
import { TextPipe } from './pipe/text.pipe';


const material =[
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  CdkTableModule,
  MatBadgeModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatDialogModule,
  MatMenuModule
]
@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    SearchPipe,
    TextPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    material
  ],
  exports:[
    HeaderComponent,
    LoadingComponent,
    FormsModule,
    material,
    SearchPipe,
    TextPipe
  ]
})
export class SharedModule { }
