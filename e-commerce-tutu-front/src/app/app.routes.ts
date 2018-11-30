import { Routes } from '@angular/router';

import { CountdownComponent } from './countdown/countdown.component';

// ADMIN COMPONENT
import { CategoryListComponent } from './view/admin-user/category/category-list/category-list.component';
import { CategoryRegisterComponent } from './view/admin-user/category/category-register/category-register.component';
import { DiscountCouponListComponent } from './view/admin-user/discount-coupon/discount-coupon-list/discount-coupon-list.component';
import {
    DiscountCouponRegisterComponent
} from './view/admin-user/discount-coupon/discount-coupon-register/discount-coupon-register.component';
import { ProductListComponent } from './view/admin-user/product/product-list/product-list.component';
import { ProductRegisterComponent } from './view/admin-user/product/product-register/product-register.component';
import { DashboardComponent } from './view/admin-user/dashboard/dashboard.component';
// USER COMPONENT
import { HomeComponent } from './view/common-user/home/home.component';
import { ProductCategoryListComponent } from './view/common-user/product-category-list/product-category-list.component';
import { CartComponent } from './view/common-user/cart/cart.component';
import { ListOneProductComponent } from './view/common-user/list-one-product/list-one-product.component';
import { UserProfileComponent } from './view/common-user/user-profile/user-profile.component';
import { WishListComponent } from './view/common-user/wish-list/wish-list.component';
import { PromotionsComponent } from './view/common-user/promotions/promotions.component';
import { ConfirmRegisterComponent } from './component/confirm-register/confirm-register.component';
import { FinishUserRegisterComponent } from './view/common-user/finish-user-register/finish-user-register.component';
import { HomeControllerListComponent } from './view/admin-user/home-controller/home-controller-list/home-controller-list.component';
import {
    HomeControllerRegisterComponent
} from './view/admin-user/home-controller/home-controller-register/home-controller-register.component';

import { SucessPaymentComponent } from './view/common-user/sucess-payment/sucess-payment.component';
import { CancelPaymentComponent } from './view/common-user/cancel-payment/cancel-payment.component';
import { OrderDetailsComponent } from './view/common-user/order-details/order-details.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'countdown', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'category_list', component: CategoryListComponent },
    { path: 'category_register', component: CategoryRegisterComponent },
    { path: 'category_edit/:id', component: CategoryRegisterComponent },
    { path: 'coupon_list/:page', component: DiscountCouponListComponent },
    { path: 'coupon_register', component: DiscountCouponRegisterComponent },
    { path: 'coupon_edit/:id', component: DiscountCouponRegisterComponent },
    { path: 'product_list/:page', component: ProductListComponent },
    { path: 'product_register/new', component: ProductRegisterComponent },
    { path: 'product_register/:id/:page', component: ProductRegisterComponent },
    { path: 'category_list/:id/:page', component: ProductCategoryListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'countdown', component: CountdownComponent },
    { path: 'product/:id', component: ListOneProductComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile/:id', component: UserProfileComponent },
    { path: 'wish_list', component: WishListComponent },
    { path: 'promotions/:page', component: PromotionsComponent },
    { path: 'confirm/:hex', component: ConfirmRegisterComponent },
    { path: 'finish_register/:id', component: FinishUserRegisterComponent },
    { path: 'home_controller_list', component: HomeControllerListComponent },
    { path: 'home_controller_edit/:id', component: HomeControllerRegisterComponent },
    { path: 'sucess_payment', component: SucessPaymentComponent },
    { path: 'cancel_payment', component: CancelPaymentComponent },
    { path: 'order_details/:hash', component: OrderDetailsComponent }
];
