import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProdutService } from '../../Services/produt.service';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product:any ={};
  @Input() index!:number;
  @Output() item:EventEmitter<any> = new EventEmitter;
  isAdmin!:boolean;
  seeMoreIndex: number = -1
  constructor(public dialog: MatDialog,private _ProdutService:ProdutService,private _AuthGuard:AuthGuard) { }
  
  ngOnInit(): void {
    this.checkAdmin();
  }
  add(){
    this.item.emit({product:this.product,quantity:1});
  }
  openDialog() {
    this.dialog.open(UpdateProductComponent);
  }
  send(product:any){
    this._ProdutService.shareProduct(product)
  }
  checkAdmin(){
    this._AuthGuard.token.subscribe((res:any)=>{
      if(res == 'admin'){
        this.isAdmin = true
      }else{
        this.isAdmin = false
      }
    })
  }
}