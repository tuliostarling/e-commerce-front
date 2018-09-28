import { Routes } from '@angular/router';

import { HomeComponent } from './view/common-user/home/home.component';
import { CategoryListComponent } from './view/admin-user/category/category-list/category-list.component';
import { CategoryRegisterComponent } from './view/admin-user/category/category-register/category-register.component';
import { DiscountCouponListComponent } from './view/admin-user/discount-coupon/discount-coupon-list/discount-coupon-list.component';
import {
    DiscountCouponRegisterComponent
    } from './view/admin-user/discount-coupon/discount-coupon-register/discount-coupon-register.component';
import { ProductListComponent } from './view/admin-user/product/product-list/product-list.component';
import { ProductRegisterComponent } from './view/admin-user/product/product-register/product-register.component';
import { ShoeListComponent } from './view/common-user/shoe-list/shoe-list.component';
import { CartComponent } from './view/common-user/cart/cart.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ListOneProductComponent } from './view/common-user/list-one-product/list-one-product.component';



export const ROUTES: Routes = [
    { path: '', redirectTo: 'countdown', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'category_list', component: CategoryListComponent },
    { path: 'category_register', component: CategoryRegisterComponent },
    { path: 'category_edit/:id', component: CategoryRegisterComponent },
    { path: 'coupon_list', component: DiscountCouponListComponent },
    { path: 'coupon_register', component: DiscountCouponRegisterComponent },
    { path: 'coupon_edit/:id', component: DiscountCouponRegisterComponent },
    { path: 'product_list', component: ProductListComponent },
    { path: 'product_register', component: ProductRegisterComponent },
    { path: 'product_edit/:id', component: ProductRegisterComponent },
    { path: 'shoe_list', component: ShoeListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'countdown', component: CountdownComponent },
    { path: 'product/:id', component: ListOneProductComponent },
];
