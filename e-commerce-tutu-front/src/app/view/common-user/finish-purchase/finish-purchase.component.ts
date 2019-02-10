import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PaymentService } from '../../../service/payment/payment-api.service';
import { AuthService } from '../../../auth/auth.service';
import { ValueModel, AdressModel } from '../../../model/shipping/shipping';
import { CartModel } from '../../../model/cart/cart';
import { UserApiService, ProductService } from '../../../service';
import { ToastrService } from 'ngx-toastr';
import { ShippingService } from '../../../service/shipping/shipping-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreateModel } from '../../../model/user/userCreate';
import { UserLoginModel } from '../../../model/user/userLogin';

@Component({
  selector: 'app-finish-purchase',
  templateUrl: './finish-purchase.component.html',
  styleUrls: ['./finish-purchase.component.css']
})
export class FinishPurchaseComponent implements OnInit {

  formulario: FormGroup;
  formCoupon: FormGroup;
  idCart: number;
  idUser: number;
  token: any;
  couponDiscount: any = null;
  discountValue: number;
  total: number;
  finalValue: number;

  update = false;
  shipBox = false;
  currentCep: string;

  cep: number;
  street: string;
  num: number;
  comp: number;
  state: string;
  city: string;
  neighborhood: string;

  installments: number;
  qtdOpt = [];
  qtdItens = [];
  sumQtdItems: number;
  division: number;

  sedex = 'checked';
  pac = '';
  discount = false;
  couponId: number;
  shipValue: number;

  rowsShipping: Array<ValueModel>;
  cartRows: Array<CartModel>;
  adressInfo: Array<AdressModel>;
  rowsUser: any;


  userAdress: Object;

  newCep: number;

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
      active: '',
      name: 'Finalizar compra'
    }
  ];

  namePageAux = 'Endereço entrega';
  debug = false;
  public rowsFormAddress: UserCreateModel;
  public loginUserModel: UserLoginModel;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private form: FormBuilder,
    private shipService: ShippingService,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService,
    private userService: UserApiService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.token = this.authService.getTokenData();

    this.formulario = this.form.group({
      id: [null],
      cep: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      neighborhood: [null, Validators.required],
      num: [null, Validators.required],
      comp: [null, Validators.required]
    });

    this.formCoupon = this.form.group({
      coupon: [null, Validators.required]
    });

    this.getToken();
    this.getUser();
    this.getUserCoupon();
    this.getProducts();
  }

  onSubmit(form) {
    this.formulario.patchValue({ id: this.token.id });
    this.rowsFormAddress = form.value;

    this.userService.updateAdresss(this.rowsFormAddress).subscribe((res) => {
      if (res != null) {
        this.newCep = this.rowsFormAddress.cep;
        this.getToken();
        this.update = false;
        this.toastrService.success(`Endereço atualizado com sucesso!`, `Sucesso!`);
      }
    });
  }

  getToken() {
    if (this.newCep == null) {
      if (this.token != null) {
        this.idUser = this.token.id;
        this.idCart = this.token.cart;
      } else {
        this.router.navigateByUrl('/home');
      }
    } else {
      this.idUser = this.token.id;
      this.idCart = this.token.cart;
      this.getShipPrice(this.newCep);
    }
  }

  getUser() {
    this.userService.getListOne(this.idUser).subscribe((res) => {
      this.rowsUser = res;
      if (res != null) {
        this.cep = this.rowsUser[0].cep;
        this.num = this.rowsUser[0].num;
        this.comp = this.rowsUser[0].comp;
        this.state = this.rowsUser[0].state;
        this.city = this.rowsUser[0].city;
        this.street = this.rowsUser[0].street;
        this.neighborhood = this.rowsUser[0].neighborhood;
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

  getProducts() {
    this.productService.getProductsCart(this.idCart).subscribe(res => {
      if (res != null) {
        this.cartRows = res.rows;
        this.finalValue = res.pricesObj.finalValue;
        this.qtdOpt = res.qtdOptions;
        for (const i of Object.keys(this.cartRows)) {
          this.qtdItens.push(this.cartRows[i].qtd);
        }
        this.sumQtdItems = this.qtdItens.reduce(this.sumItems, 0);

        this.total = this.finalValue;
        if (this.token.cep == null) {
          this.shipBox = true;
        } else {
          this.getShipPrice(this.token.cep);
        }
      }
    });
  }

  sumItems(a, b) {
    return a + b;
  }

  select(evt) {
    this.couponId = evt;

    let value;
    this.couponDiscount.forEach(element => {
      if (element.id.toString() === evt) {
        value = element.value;
      }
    });

    if (evt === 'null') {
      this.discount = false;
      this.discountValue = null;
      this.total = this.finalValue;
      this.total += this.shipValue;
    } else {
      this.discount = true;
      this.discountValue = this.finalValue * (value / 100);
      this.discountValue = parseFloat(this.discountValue.toFixed(2));

      this.total -= this.discountValue;
      this.total = parseFloat(this.total.toFixed(2));
    }
  }

  radioButton(evt, name) {
    this.total = this.finalValue;
    this.shipValue = parseFloat(evt);
    this.total += this.shipValue;

    if (this.discount === true) {
      this.total -= this.discountValue;
    }

    if (name === 'pac') {
      this.sedex = '';
      this.pac = 'checked';
    } else {
      this.pac = '';
      this.sedex = 'checked';
    }
  }

  finishPayment() {
    if (this.token.cep == null) { return this.router.navigateByUrl(`/finish_register/${this.token.id}`); }

    let discountUserObj;
    if (this.couponDiscount != null) {
      this.couponDiscount.forEach(element => {
        if (element.id.toString() === this.couponId) {
          discountUserObj = element;
        }
      });
    }

    if (this.discountValue != null) {
      this.couponDiscount.price = -Math.abs(this.discountValue);
      discountUserObj.value = this.couponDiscount.price;
    }

    const paymentObj = {
      cartItem: this.cartRows,
      price: this.total,
      subTotal: this.finalValue,
      shipping: this.debug ? this.rowsShipping[0].Valor : 0,
      idUser: this.token.id,
      adress: this.adressInfo,
      discount: discountUserObj
    };

    this.spinnerService.show();
    this.paymentService.payCart(paymentObj).subscribe((res) => {
      if (res != null) {
        window.location.href = res.redirect;
        this.spinnerService.hide();
      }
    });
  }

  getShipPrice(cepVal) {
    if (this.debug) {
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
            this.shipValue = this.rowsShipping[0].Valor;
            this.shipBox = false;
            this.spinnerService.hide();
          }
        });
      } else {
        this.toastrService.error('CEP inválido', 'Erro!');
      }
    }
  }

  maskCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{2})(\d)/, '$1.$2');
    cep = cep.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return cep;
  }

  changePage(evt, namePage: string) {
    if (namePage === 'Endereço entrega') {
      this.pageArr[0].active = 'active';
      this.pageArr[1].active = '';
      this.pageArr[2].active = '';
      this.pageArr[3].active = '';
      this.namePageAux = 'Endereço entrega';
    } else if (namePage === 'Produtos') {
      this.pageArr[0].active = '';
      this.pageArr[1].active = 'active';
      this.pageArr[2].active = '';
      this.pageArr[3].active = '';
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

      if (this.total >= 80 && this.total < 140) {
        this.installments = 2;
        this.division = Math.round(this.total / this.installments);
      } else if (this.total >= 140 && this.total < 300) {
        this.installments = 3;
        this.division = Math.round(this.total / this.installments);
      } else if (this.total >= 300) {
        this.installments = 4;
        this.division = Math.round(this.total / this.installments);
      } else {
        this.installments = 1;
      }
    }
  }

  clickUpdate() {
    this.update = !this.update;
  }

}
