import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private apiService: CouponService,
    private form: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
      expire_at: [null, Validators.required],
      valid: true
    });
  }

  navToListCoup() {
    this.router.navigateByUrl('coupon_list');
  }

  onSubmit(form) {
    this.createCouponModel = form.value;

    this.apiService.create(this.createCouponModel)
      .subscribe(res => {
        if (res == null) return alert('Erro ao cadastrar');

        this.navToListCoup();
      });
  }

}
