import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { CouponService } from '../../../../service/discount-coupon/coupon-api.service';
import { CouponModel } from '../../../../model/discount-coupon/coupon';

@Component({
  selector: 'app-discount-coupon-register',
  templateUrl: './discount-coupon-register.component.html',
  styleUrls: ['./discount-coupon-register.component.css']
})
export class DiscountCouponRegisterComponent implements OnInit {

  formulario: FormGroup;
  createCouponModel: CouponModel;
  idCoupon: number;
  mode: string;

  constructor(
    private apiService: CouponService,
    private form: FormBuilder,
    public acRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.acRoute.params
      .subscribe((params: any) => {
        if (params.hasOwnProperty('id')) {
          this.idCoupon = params.id;
          this.mode = 'Editar';
          this.recoverRegistry();
        } else {
          this.mode = 'Cadastrar';
        }
      });

    this.formulario = this.form.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
      expire_at: [null, Validators.required],
      valid: true
    });
  }

  recoverRegistry() {
    if (this.idCoupon !== undefined) {
      this.apiService.getListOne(this.idCoupon).subscribe((data) => {
        if (data) {

          const formattedDate = new DatePipe('en-US').transform(data[0].expire_at, 'yyyy-MM-dd');
          this.formulario = this.form.group({
            id: [data[0].id],
            name: [data[0].name, Validators.required],
            value: [data[0].value, Validators.required],
            expire_at: [formattedDate, Validators.required],
            valid: [data[0].valid]
          });
        } else {
          this.toastrService.error('Erro ao carregar', 'Erro!');
        }
      });
    }
  }

  navToListCoup() {
    this.router.navigateByUrl('/coupon_list/0');
  }

  onSubmit(form) {
    this.createCouponModel = form.value;

    if (this.idCoupon === undefined) {
      this.apiService.create(this.createCouponModel).subscribe(res => {
        if (res === null) { return this.toastrService.error('Erro ao cadastrar', 'Erro!'); }

        this.toastrService.success('Cumpom cadastrado!', 'Sucesso!');
        this.navToListCoup();
      });
    } else {
      this.apiService.update(this.createCouponModel).subscribe((res) => {
        if (res === null) { return this.toastrService.error('Erro ao cadastrar', 'Erro!'); }

        this.navToListCoup();
      });
    }
  }
}
