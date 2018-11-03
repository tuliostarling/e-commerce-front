import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserApiService } from '../../service';
import { UserCreateModel } from '../../model/user/userCreate';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

  modalReference: any;
  formulario: FormGroup;
  createUserModel: UserCreateModel;
  closeModal: string;

  constructor(
    private service: UserApiService,
    private modalService: NgbModal,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      admin: false
    });
  }

  openModal(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  onSubmit(form) {
    this.createUserModel = form.value;

    this.service.createUser(this.createUserModel)
      .subscribe(res => {
        if (res == null) {
          return alert('Erro ao cadastrar');
        } else {
          this.modalReference.close();
          return alert('Usuário cadastrado, link de confirmação enviado para seu email!');
        }
      });
  }

}
