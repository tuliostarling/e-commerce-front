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
export class ModalLoginComponent implements OnInit{
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
      senha: [null]
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  onSubmit(form) {
    this.createLoginUser = form.value;

    this.service.postUser(this.createLoginUser)
      .subscribe(res => {
        if (res == null) {
          return alert('Erro ao cadastrar Usuário');
        } else {
          return alert('Usuário cadastrado com sucesso!');
        }
      });
  }

}
