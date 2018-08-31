import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header/header.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { FooterComponent } from './footer/footer.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    ModalLoginComponent,
    FooterComponent,
    ModalRegisterComponent
  ],
  exports: [
    HeaderComponent,
    ModalLoginComponent,
    FooterComponent,
    ModalRegisterComponent
  ]
})
export class ComponentModule { }
