import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

import { UserCreateModel } from '../../../model/user/userCreate';

import { ToastrService } from 'ngx-toastr';
import { ShippingService } from '../../../service/shipping/shipping-api.service';

@Component({
  selector: 'app-finish-user-register',
  templateUrl: './finish-user-register.component.html',
  styleUrls: ['./finish-user-register.component.css']
})
export class FinishUserRegisterComponent implements OnInit {

  formulario: FormGroup;
  id: number;
  state: string;
  city: string;
  street: string;
  neighborhood: string;

  previousUrl: string;


  constructor(
    public apiService: UserApiService,
    public apiServiceCEP: ShippingService,
    private form: FormBuilder,
    public router: Router,
    private acRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  public rowsUser: UserCreateModel;

  ngOnInit() {

    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {
        this.previousUrl = e[0].urlAfterRedirects;
        console.log(this.previousUrl);
      });

    this.id = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.form.group({
      id: [this.id],
      cep: [null, Validators.required],
      cpf: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      street: [null, Validators.required],
      neighborhood: [null, Validators.required],
      num: [null, Validators.required],
      comp: [null, Validators.required]
    });
  }

  onSubmit(form) {
    this.rowsUser = form.value;

    const validaCPFbool = this.validaCPF(this.rowsUser.cpf);

    if (validaCPFbool === true) {
      this.apiService.update(this.rowsUser).subscribe((res) => {
        if (res === null) { return this.toastrService.error('Erro ao atualizar dados', 'Erro!'); }
      });
    } else {
      return this.toastrService.error('CPF inválido, por favor digite novamente', 'Erro!');
    }
    console.log(this.previousUrl);
    console.log(this.previousUrl === '/cart');
    if (this.previousUrl === '/cart') return this.router.navigateByUrl('/cart');

    this.toastrService.success('Dados atualizados, por favor saia e entre da sua conta!', 'Sucesso!');
    return this.home();
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  onblur(evt: any) {
    const cep = evt.target.value;

    this.apiServiceCEP.getCepInfo(cep).subscribe((res) => {
      this.neighborhood = res.adress.neighborhood;
      this.state = res.adress.state;
      this.city = res.adress.city;
      this.street = res.adress.street;
    });
  }

  validaCPF(cpf: any) {
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf != null) {

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
    }
  }
}
