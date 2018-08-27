import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ROUTES } from './app.routes';
import { ApiService } from './service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header/header.component';
import { HomeComponent } from './view/home/home.component';
import { ModalLoginComponent } from './component/modal-login/modal-login.component';
import { TopSellingProductsComponent } from './component/top-selling-products/top-selling-products.component';
import { FooterComponent } from './component/footer/footer.component';
import { ModalRegisterComponent } from './component/modal-register/modal-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ModalLoginComponent,
    TopSellingProductsComponent,
    FooterComponent,
    ModalRegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
