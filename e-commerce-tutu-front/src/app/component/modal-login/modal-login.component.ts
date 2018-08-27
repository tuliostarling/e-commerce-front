import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../service'
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
  createLoginUser: UserLoginModel;

  constructor(
    private service: ApiService,
    private modalService: NgbModal,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      email: [null],
      password: [null]
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onSubmit(form) {
    this.createLoginUser = form.value;

    this.service.postUser(this.createLoginUser)
      .subscribe(res => {
        if (res == null) return alert('Erro ao entrar');

        if (res.token != null) {
          localStorage.setItem('token', res.token);
          let toot = this.jwtDecode(res.token);
          if (toot != null) return alert('Usuário logado com sucesso!');
        }

      });
  }


  jwtDecode(token) {

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64))
  }
}
