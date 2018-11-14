import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserApiService } from '../../../service';
import { UserCreateModel } from '../../../model/user/userCreate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('openModalEle') openModalEle: ElementRef;

  formulario: FormGroup;
  id: number;
  pass: string;
  name: string;
  email: string;
  cep: number;
  cpf: number;
  num: string;
  comp: string;
  street: string;
  neighborhood: string;

  update = false;

  decodedCep: string;
  decodedToken: any;

  constructor(
    public apiService: UserApiService,
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
      this.street = this.rowsUser[0].street;
      this.neighborhood = this.rowsUser[0].neighborhood;
    });

    this.formulario = this.form.group({
      id: [null],
      name: [null, Validators.required],
      email: [null],
      cpf: [null],
      cep: [null],
      street: [null],
      neighborhood: [null],
      num: [null],
      comp: [null]
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

    this.apiService.update(this.rowsUser).subscribe((res) => {
      if (res === null) { return this.toastrService.error('Erro ao atualizar os dados', 'Erro!'); }

      this.toastrService.success('Dados atualizados!', 'Sucesso!');
      this.update = false;
      return this.ngOnInit();
    });

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
}
