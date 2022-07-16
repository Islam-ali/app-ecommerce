import { CartService } from './../carts/Services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectProductComponent } from './Components/select-product/select-product.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { SharedModule } from '../shared/shared.module';
import { ProdutService } from './Services/produt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './Components/product/product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    SelectProductComponent,
    ProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[ProdutService]
})
export class ProductsModule { }
