import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ngfModule } from 'angular-file';

import { CategoryRegisterComponent } from './category/category-register/category-register.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { DiscountCouponListComponent } from './discount-coupon/discount-coupon-list/discount-coupon-list.component';
import { DiscountCouponRegisterComponent } from './discount-coupon/discount-coupon-register/discount-coupon-register.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductRegisterComponent } from './product/product-register/product-register.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    AngularFontAwesomeModule,
    ngfModule
  ],
  declarations: [
    CategoryRegisterComponent,
    CategoryListComponent,
    DiscountCouponListComponent,
    DiscountCouponRegisterComponent,
    ProductListComponent,
    ProductRegisterComponent
  ],
  exports: [
    CategoryRegisterComponent,
    CategoryListComponent
  ]
})
export class AdminUserModule { }
