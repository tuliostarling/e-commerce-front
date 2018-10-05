import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { TopSellingProductsComponent } from '../../component/top-selling-products/top-selling-products.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';
import { CartComponent } from './cart/cart.component';
import { ListOneProductComponent } from './list-one-product/list-one-product.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    TopSellingProductsComponent,
    ShoeListComponent,
    CartComponent,
    ListOneProductComponent,
    ProductCategoryListComponent,
    UserProfileComponent,
  ],
  exports: [
    HomeComponent,
    TopSellingProductsComponent,
  ]
})
export class CommonUserModule { }
