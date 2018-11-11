import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCreateModel } from '../../../model/user/userCreate';

@Component({
  selector: 'app-finish-user-register',
  templateUrl: './finish-user-register.component.html',
  styleUrls: ['./finish-user-register.component.css']
})
export class FinishUserRegisterComponent implements OnInit {

  formulario: FormGroup;
  id: number;

  constructor(
    public apiService: UserApiService,
    private form: FormBuilder,
    public router: Router,
    private acRoute: ActivatedRoute, ) { }

  public rowsUser: UserCreateModel;

  ngOnInit() {
    this.id = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.form.group({
      id: [null],
      cep: [null, Validators.required],
      cpf: [null, Validators.required],
      street: [null, Validators.required],
      neighborhood: [null, Validators.required],
      num: [null, Validators.required],
      comp: [null, Validators.required]
    });
  }

  onSubmit(form) {
    this.rowsUser = form.value;

    this.apiService.update(this.rowsUser).subscribe((res) => {
      if (res === null) { return alert('Erro ao cadastrar'); }
    });
  }

  home() {
    this.router.navigateByUrl('/home');
  }
}
