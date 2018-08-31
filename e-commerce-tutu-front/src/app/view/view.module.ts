import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminUserModule } from './admin-user/admin-user.module';
import { CommonUserModule } from './common-user/common-user.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AdminUserModule,
    CommonUserModule
  ],
  declarations: [ ],
  exports: [
    AdminUserModule,
    CommonUserModule
  ]
})
export class ViewModule { }
