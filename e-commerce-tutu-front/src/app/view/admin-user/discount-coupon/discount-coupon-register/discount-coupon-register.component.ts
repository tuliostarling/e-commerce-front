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
    private router: Router
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
          alert('erro');
        }
      });
    }
  }

  navToListCoup() {
    this.router.navigateByUrl('coupon_list');
  }

  onSubmit(form) {
    this.createCouponModel = form.value;

    if (this.idCoupon === undefined) {
      this.apiService.create(this.createCouponModel).subscribe(res => {
        if (res === null) { return alert('Erro ao cadastrar'); }

        this.navToListCoup();
      });
    } else {
      this.apiService.update(this.createCouponModel).subscribe((res) => {
        if (res === null) { return alert('Erro ao cadastrar'); }

        this.navToListCoup();
      });
    }
  }

}
