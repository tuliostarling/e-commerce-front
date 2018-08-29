import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../service';
import { UserCreateModel } from '../../model/user/userCreate';

@Component({
  selector: 'modal-register',
  templateUrl: './modal-register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  @Input() classes: string;

  formulario: FormGroup;
  createUserModel: UserCreateModel;

  constructor(
    private service: ApiService,
    private modalService: NgbModal,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      name: [null ,Validators.required],
      email: [null ,Validators.required],
      password: [null ,Validators.required],
      admin: false
    });
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  onSubmit(form) {
    this.createUserModel = form.value;

    this.service.createUser(this.createUserModel)
      .subscribe(res => {
        if (res == null) return alert('Erro ao cadastrar');
        return alert('Usuário cadastrado com sucesso!');
      });
  }

}
