import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { TopSellingProductsComponent } from '../../component/top-selling-products/top-selling-products.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    TopSellingProductsComponent,
  ],
  exports: [
    HomeComponent,
    TopSellingProductsComponent,
  ]
})
export class CommonUserModule { }
