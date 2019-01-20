import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { TopSellingProductsComponent } from '../../component/top-selling-products/top-selling-products.component';
import { CartComponent } from './cart/cart.component';
import { ListOneProductComponent } from './list-one-product/list-one-product.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { FinishUserRegisterComponent } from './finish-user-register/finish-user-register.component';
import { CepDirective } from 'src/app/directives/cep.directive';
import { CpfDirective } from '../../directives/cpf.directive';
import { SucessPaymentComponent } from './sucess-payment/sucess-payment.component';
import { CancelPaymentComponent } from './cancel-payment/cancel-payment.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FinishPurchaseComponent } from './finish-purchase/finish-purchase.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(), BrowserAnimationsModule
  ],
  declarations: [
    HomeComponent,
    TopSellingProductsComponent,
    CartComponent,
    ListOneProductComponent,
    ProductCategoryListComponent,
    UserProfileComponent,
    WishListComponent,
    PromotionsComponent,
    FinishUserRegisterComponent,
    CepDirective,
    CpfDirective,
    SucessPaymentComponent,
    CancelPaymentComponent,
    OrderDetailsComponent,
    FinishPurchaseComponent,
    AboutComponent,
    ContactUsComponent,
  ],
  exports: [
    HomeComponent,
    TopSellingProductsComponent,
  ]
})
export class CommonUserModule { }
