import { CartService } from './../../../carts/Services/cart.service';
import { ProdutService } from './../../Services/produt.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsProduct } from 'src/app/model/product';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  productDetail!:DetailsProduct;
  loading:boolean=false;
  id:any;
  constructor(private _ProdutService:ProdutService,private _ActivatedRoute:ActivatedRoute) {
    this.id = this._ActivatedRoute.snapshot.paramMap.get("id")
   }

  ngOnInit(): void {
    this.getProductDetails();
  }
  getProductDetails(){
      this.loading=true
      this._ProdutService.getSingleProduct(this.id).subscribe((res:any)=>{
        this.loading=false
        this.productDetail = res;
      })
  }
}
