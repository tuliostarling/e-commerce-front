import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { TopSellingProductsComponent } from '../../component/top-selling-products/top-selling-products.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';
import { CartComponent } from './cart/cart.component';
import { ListOneProductComponent } from './list-one-product/list-one-product.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    TopSellingProductsComponent,
    ShoeListComponent,
    CartComponent,
    ListOneProductComponent,
    ProductCategoryListComponent,
  ],
  exports: [
    HomeComponent,
    TopSellingProductsComponent,
  ]
})
export class CommonUserModule { }
