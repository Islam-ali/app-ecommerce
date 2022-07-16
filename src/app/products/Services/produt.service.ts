import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutService {
  productItem = new BehaviorSubject<any>('')
  baseUrl = environment._Api
  constructor(private HttpClient:HttpClient,) { }

  allProducts(){
    return this.HttpClient.get(this.baseUrl+'products')
  }
  getCategories(){
    return this.HttpClient.get(this.baseUrl+'products/categories')
  }
  getInSpecificCategory(selectCategory:string){
    return this.HttpClient.get(this.baseUrl+'products/category/'+selectCategory)
  }
  getSingleProduct(id:number){
    return this.HttpClient.get(this.baseUrl+'products/'+id)
  }
  updateProduct(id:number,product:any){
    return this.HttpClient.put(this.baseUrl+'products/'+id,product)
  }
  shareProduct(product:any){
    this.productItem.next(product)
  }
}
