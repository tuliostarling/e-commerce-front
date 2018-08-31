import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Location } from '@angular/common';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserApiService } from '../../service'
import { UserLoginModel } from '../../model/user/userLogin';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  @Input() classes: string;

  formulario: FormGroup;
  loginUserModel: UserLoginModel;

  constructor(
    private service: UserApiService,
    private modalService: NgbModal,
    private form: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      email: [null],
      password: [null]
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  onSubmit(form) {
    this.loginUserModel = form.value;

    this.service.loginUser(this.loginUserModel)
      .subscribe(res => {
        if (res == null) return alert('Erro ao entrar');

        if (res.token != null) {
          localStorage.setItem('token', res.token);
          let t = this.jwtDecode(res.token);
          if (t != null) location.reload();
        }

      });
  }

  jwtDecode(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
  }
}
