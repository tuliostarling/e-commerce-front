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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ModalLoginComponent
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
