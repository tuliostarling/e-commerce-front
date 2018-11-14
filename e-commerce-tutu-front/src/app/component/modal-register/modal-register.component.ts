import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UserApiService } from '../../service';
import { UserCreateModel } from '../../model/user/userCreate';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  @Input() classes: string;

  modalReference: any;
  formulario: FormGroup;
  createUserModel: UserCreateModel;
  closeModal: string;

  constructor(
    private service: UserApiService,
    private modalService: NgbModal,
    private form: FormBuilder,
    private toastrService: ToastrService
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
          return this.toastrService.error('Erro ao cadastrar', 'Erro!');
        } else {
          this.modalReference.close();
          return this.toastrService.success('Usuário cadastrado, link de confirmação enviado para seu email!', 'Sucesso!');
        }
      });
  }

}
