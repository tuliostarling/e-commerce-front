import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserApiService } from '../../../service';
import { UserCreateModel } from '../../../model/user/userCreate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShippingService } from '../../../service/shipping/shipping-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('openModalEle') openModalEle: ElementRef;

  formulario: FormGroup;
  formnewpass: FormGroup;
  id: number;
  pass: string;
  name: string;
  email: string;
  cep: number;
  cpf: number;
  num: string;
  comp: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  chagepassBool = false;

  update = false;

  decodedCep: string;
  decodedToken: any;

  constructor(
    public apiService: UserApiService,
    public apiServiceCEP: ShippingService,
    private form: FormBuilder,
    public router: Router,
    private acRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  public rowsUser: UserCreateModel;

  ngOnInit() {
    this.id = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.decodedCep = this.decodedToken.cep;
    }

    if (this.decodedCep === null) {
      this.openModalEle.nativeElement.click();
    }

    this.apiService.getListOne(this.id).subscribe((res) => {
      this.rowsUser = res;

      this.name = this.rowsUser[0].name;
      this.email = this.rowsUser[0].email;
      this.cep = this.rowsUser[0].cep;
      this.cpf = this.rowsUser[0].cpf;
      this.num = this.rowsUser[0].num;
      this.comp = this.rowsUser[0].comp;
      this.state = this.rowsUser[0].state;
      this.city = this.rowsUser[0].city;
      this.street = this.rowsUser[0].street;
      this.neighborhood = this.rowsUser[0].neighborhood;
    });

    this.formulario = this.form.group({
      id: [null],
      name: [null, Validators.required],
      email: [null],
      cpf: [null],
      cep: [null],
      state: [null],
      city: [null],
      street: [null],
      neighborhood: [null],
      num: [null],
      comp: [null]
    });

    this.formnewpass = this.form.group({
      email: [null, Validators.required],
      oldpass: [null, Validators.required],
      newpass: [null, Validators.required]
    });
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  onSubmit(form) {
    this.attForm();
    this.rowsUser = form.value;

    const validaCPFbool = this.validaCPF(this.rowsUser.cpf);

    if (validaCPFbool === true) {
      this.apiService.update(this.rowsUser).subscribe((res) => {
        if (res === null) { return this.toastrService.error('Erro ao atualizar os dados', 'Erro!'); }

        this.toastrService.success('Dados atualizados!', 'Sucesso!');
        this.update = false;
        return this.ngOnInit();
      });
    } else {
      return this.toastrService.error('CPF inválido, por favor digite novamente', 'Erro!');
    }
  }

  attForm() {
    this.formulario.patchValue({
      id: this.id,
      email: this.email,
    });
  }

  clickUpdate() {
    this.update = !this.update;
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  finishRegister() {
    this.router.navigateByUrl('/finish_register/' + this.decodedToken.id);
  }

  updatePass(form) {
    this.formnewpass.patchValue({ email: this.email });

    this.apiService.changePass(form.value).subscribe((res) => {
      if (res == null) { return this.toastrService.error('Erro ao atualizar senha.', 'Erro!'); }

      this.toastrService.success('Senha atualizada!', 'Sucesso!');
      this.chagepassBool = false;
    });
  }

  change_pass() {
    this.chagepassBool = !this.chagepassBool;
  }

  onblur(evt: any) {
    const cep = evt.target.value;

    if (this.cep !== cep) {
      this.apiServiceCEP.getCepInfo(cep).subscribe((res) => {
        this.state = res.adress.state;
        this.city = res.adress.city;
        this.street = res.adress.street;
        this.neighborhood = res.adress.neighborhood;
        this.num = '';
        this.comp = '';
      });
    }
  }

  validaCPF(cpf: any) {
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;

    if (cpf !== null) {
      cpf = cpf.replace(/[^a-zA-Z0-9]/g, '');

      if (cpf.length < 11) { return false; }
      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }
      }
      if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
          soma += numeros.charAt(10 - i) * i;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(0)) {
          return false;
        }

        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) {
          soma += numeros.charAt(11 - i) * i;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(1)) {
          return false;
        }

        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
