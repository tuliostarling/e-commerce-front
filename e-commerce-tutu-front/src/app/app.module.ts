import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';
import { UserApiService } from './service';
import { CategoryService } from './service/category/category-api.service';

import { ViewModule } from './view/view.module';
import { ComponentModule } from './component/component.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ViewModule,
    ComponentModule
  ],
  providers: [UserApiService, HttpClientModule, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
