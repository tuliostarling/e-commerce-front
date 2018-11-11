import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  update = false;

  decodedCep: string;
  decodedToken: any;

  constructor(
    public apiService: UserApiService,
    private form: FormBuilder,
    public router: Router,
    private acRoute: ActivatedRoute,
    private modalService: NgbModal,
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

    this.apiService.getListOne(this.id).subscribe((data) => {
      this.rowsUser = data;
      this.name = this.rowsUser[0].name;
      this.email = this.rowsUser[0].email;
    });

    this.formulario = this.form.group({
      id: [null],
      name: [null, Validators.required],
      email: [null],
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
      if (res === null) { return alert('Erro ao cadastrar'); }

      this.update = false;
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
