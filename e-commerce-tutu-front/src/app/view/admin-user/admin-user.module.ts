import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoryRegisterComponent } from './category/category-register/category-register.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    CategoryRegisterComponent,
    CategoryListComponent
  ],
  exports: [
    CategoryRegisterComponent,
    CategoryListComponent
  ]
})
export class AdminUserModule { }
