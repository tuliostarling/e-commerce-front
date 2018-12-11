import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaymentService } from '../../../service/payment/payment-api.service';
import { AuthService } from '../../../auth/auth.service';
import { ValueModel, AdressModel } from '../../../model/shipping/shipping';
import { CartModel } from '../../../model/cart/cart';
import { UserApiService } from '../../../service';
import { ToastrService } from 'ngx-toastr';
import { ShippingService } from '../../../service/shipping/shipping-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finish-purchase',
  templateUrl: './finish-purchase.component.html',
  styleUrls: ['./finish-purchase.component.css']
})
export class FinishPurchaseComponent implements OnInit {

  formulario: FormGroup;
  formCoupon: FormGroup;
  idCart: number;
  token: any;
  couponDiscount: any = null;
  discountValue: number;
  total: number;
  finalValue: number;

  update = false;

  rowsShipping: Array<ValueModel>;
  cartRows: Array<CartModel>;
  adressInfo: Array<AdressModel>;
  shipBox = false;
  currentCep: string;

  pageArr = [
    {
      active: 'active',
      name: 'Endereço entrega'
    },
    {
      active: '',
      name: 'Produtos'
    },
    {
      active: '',
      name: 'Frete e Cupom'
    },
    {
      active: 'disabled',
      name: 'Finalizar compra'
    }
  ];

  namePageAux = 'Endereço entrega';

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private form: FormBuilder,
    private shipService: ShippingService,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService,
    private userService: UserApiService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.token = this.authService.getTokenData();

    this.formulario = this.form.group({
      id: [null],
      cep: [null],
      state: [null],
      city: [null],
      street: [null],
      neighborhood: [null],
      num: [null],
      comp: [null]
    });

    this.formCoupon = this.form.group({
      coupon: [null, Validators.required]
    });

    this.getToken();
    this.getUserCoupon();
  }

  finishPayment() {
    if (this.token.cep == null) { return this.router.navigateByUrl(`/finish_register/${this.token.id}`); }

    if (this.couponDiscount != null) { this.couponDiscount.price = -Math.abs(this.discountValue); }

    const paymentObj = {
      cartItem: this.cartRows,
      price: this.total,
      subTotal: this.finalValue,
      shipping: this.rowsShipping[0].Valor,
      idUser: this.token.id,
      adress: this.adressInfo,
      discount: this.couponDiscount
    };

    this.spinnerService.show();
    this.paymentService.payCart(paymentObj).subscribe((res) => {
      if (res != null) {
        window.location.href = res.redirect;
        this.spinnerService.hide();
      }
    });
  }

  getUserCoupon() {
    const id = this.token.id;

    this.userService.getUserCoupon(id).subscribe(res => {
      if (res != null) {
        this.couponDiscount = res;
      }
    });
  }

  getShipPrice(cepVal) {
    if (cepVal === true) { return this.shipBox === true; }

    const validacep = /\d{2}\.\d{3}\-\d{3}/;
    this.currentCep = cepVal.value || cepVal;

    if (this.currentCep.indexOf('-') > -1 === false) { this.currentCep = this.maskCEP(this.currentCep); }

    if (validacep.test(this.currentCep)) {
      const cep = this.currentCep.replace(/\D/g, '');
      const obj = { cep: cep, value: this.finalValue };

      this.shipService.getShippingValue(obj).subscribe((res) => {
        if (res) {
          this.rowsShipping = res.totalValue;
          this.adressInfo = res.adress;
          this.total = this.total + this.rowsShipping[0].Valor;
          this.total = parseFloat(this.total.toFixed(2));
          this.shipBox = false;
          this.spinnerService.hide();
        }
      });
    } else {
      this.toastrService.error('CEP inválido', 'Erro!');
    }
  }

  maskCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{2})(\d)/, '$1.$2');
    cep = cep.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return cep;
  }

  getToken() {
    if (this.token != null) {
      if (this.token.cep == null) {
        this.shipBox = true;
      } else {
        this.getShipPrice(this.token.cep);
      }
    }
  }

  changePage(namePage: string) {
    if (namePage === 'Endereço entrega') {
      this.pageArr[0].active = 'active';
      this.pageArr[1].active = '';
      this.pageArr[2].active = '';
      this.pageArr[3].active = 'disabled';
      this.namePageAux = 'Endereço entrega';
    } else if (namePage === 'Produtos') {
      this.pageArr[0].active = '';
      this.pageArr[1].active = 'active';
      this.pageArr[2].active = '';
      this.pageArr[3].active = 'disabled';
      this.namePageAux = 'Produtos';
    } else if (namePage === 'Frete e Cupom') {
      this.pageArr[0].active = '';
      this.pageArr[1].active = '';
      this.pageArr[2].active = 'active';
      this.pageArr[3].active = '';
      this.namePageAux = 'Frete e Cupom';
    } else {
      this.pageArr[0].active = '';
      this.pageArr[1].active = '';
      this.pageArr[2].active = '';
      this.pageArr[3].active = 'active';
      this.namePageAux = 'Finalizar compra';
    }
  }

  clickUpdate() {
    this.update = !this.update;
  }

}
