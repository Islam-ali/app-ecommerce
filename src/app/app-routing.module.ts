import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'product', pathMatch: 'full'
  },
  {
    path: 'auth',  loadChildren: () => import('./auth/auth.module').then(
      module => module.AuthModule
    )
  },
  {
    path: 'admin',  loadChildren: () => import('./admin/admin.module').then(
      module => module.AdminModule
    ),
    canActivate:[AuthGuard]
  },
  {
    path: 'product',  loadChildren: () => import('./products/products.module').then(
      module => module.ProductsModule
    ),
    canActivate:[AuthGuard]
  },
  {
    path: 'cart',  loadChildren: () => import('./carts/carts.module').then(
      module => module.CartsModule
    ),
    canActivate:[AuthGuard]
  },
  {
    path:'**',loadChildren: () => import('./products/products.module').then(
    module => module.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
