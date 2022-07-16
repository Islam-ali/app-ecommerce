import { CartService } from './../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProduct: any[] = [];
  totalPrice: number = 0;
  done: boolean = false;
  loading: boolean = false;

  constructor(private _CartService: CartService,private _SharedService:SharedService) {}

  ngOnInit(): void {
    this.getCartProduct();
  }
  getCartProduct() {
    if ('cart' in localStorage) {
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      this.getTotalPrice();
    }
  }
  emptyCart() {
    localStorage.removeItem('cart');
    this.cartProduct = [];
    this._SharedService.getLengthCart();
  }
  deleteProduct(index: number) {
    this.cartProduct.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
    this.getTotalPrice();
    this._SharedService.getLengthCart();
  }
  getTotalPrice() {
    this.totalPrice = 0;
    for (let index in this.cartProduct) {
      this.totalPrice +=
        this.cartProduct[index].product.price *
        this.cartProduct[index].quantity;
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  checkOut() {
    this.loading = true;
    let products = this.cartProduct.map((item) => {
      return { productId: item.product.id, quantity: item.quantity };
    });
    let model = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    this._CartService.addNewCart(model).subscribe((res: any) => {
      this.loading = false;
      this.done = true;
      setTimeout(() => {
        this.done = false;
      }, 3000);
    });
  }
}
