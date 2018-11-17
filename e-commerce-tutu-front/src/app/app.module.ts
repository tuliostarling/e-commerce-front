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
    CountdownTimerModule
  ],
  providers: [UserApiService, HttpClientModule, CategoryService, CouponService, ProductService, CommentService, ShippingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
