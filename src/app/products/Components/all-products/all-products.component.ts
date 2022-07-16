import { ProdutService } from './../../Services/produt.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Product } from 'src/app/model/product';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products!:Product[];
  loading:boolean=false;
  allCategories:string[]=[];
  cartProduct:any[]=[];
  query:string='';
  constructor(private PruductService:ProdutService ,private _SharedService:SharedService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categories();
    this.getAllProducts();
  }
  getAllProducts(){
    this.loading=true
    this.PruductService.allProducts().subscribe((res:any)=>{
      this.loading=false
      this.products = res;
    })
  }
  categories(){
    this.loading=true
    this.PruductService.getCategories().subscribe((res:any)=>{
      this.loading=false
      this.allCategories = res;
    })
  }
  getSelectCategory(select:string){
    this.loading=true
    if(select == 'all'){
      this.getAllProducts()
    }else{
      this.PruductService.getInSpecificCategory(select).subscribe((res:any)=>{
        this.loading=false
        this.products = res;
      });
    }
  }
  getfilterSearch(value:string){
    this.query = value
  }
  addToCart(data:any){
    if("cart" in localStorage)
    {
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProduct.find(item => item.product.id == data.product.id)
      if(exist){
        this.toastr.warning("product is already in your cart", "Warning");
      }else{
        this.toastr.info("add product in your cart", "Done");
        this.cartProduct.push(data)
        localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
      }
    }
    else{
      this.cartProduct.push(data)
      localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
    }
    this._SharedService.getLengthCart();
  }
}
