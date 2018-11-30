import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';
import { UserApiService } from './service';
import { CategoryService } from './service/category/category-api.service';
import { CouponService } from './service/discount-coupon/coupon-api.service';
import { ProductService } from './service/product/product-api.service';
import { CommentService } from './service/comment/comment-api.service';
import { ShippingService } from './service/shipping/shipping-api.service';

import { ViewModule } from './view/view.module';
import { ComponentModule } from './component/component.module';

import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { PaymentService } from './service/payment/payment-api.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorError } from './auth/http.interceptor';
import { AuthServicesModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ViewModule,
    ComponentModule,
    CountdownTimerModule,
    AuthServicesModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    UserApiService,
    HttpClientModule,
    CategoryService,
    CouponService,
    ProductService,
    CommentService,
    ShippingService,
    PaymentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorError,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
