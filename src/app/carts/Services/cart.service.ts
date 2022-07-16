import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailsProduct } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  addNewCart(model:any){
    return this._HttpClient.post(environment._Api + 'carts' ,model)
  }
}
