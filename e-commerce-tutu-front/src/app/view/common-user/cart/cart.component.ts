import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../service';
import { CartModel } from '../../../model/cart/cart';
import { ValueModel, AdressModel } from '../../../model/shipping/shipping';
import { ShippingService } from '../../../service/shipping/shipping-api.service';
import { PaymentService } from '../../../service/payment/payment-api.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  idCart: number;
  idItem: number;
  cartRows: Array<CartModel>;
  decodedToken: any;
  selectValue: number;
  finalValue: number;
  qtdOpt = [];
  qtdItens = [];
  total: number;
  sumQtdItems: number;
  installments: number;
  division: number;

  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  rowsShipping: Array<ValueModel>;
  adressInfo: Array<AdressModel>;
  shipBox: boolean;
  currentCep: string;

  emptyCart: boolean;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private shipService: ShippingService,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.idCart = this.decodedToken.cart;
    }

    this.getProducts();
    this.getToken();
  }

  getProducts() {
    this.apiService.getProductsCart(this.idCart).subscribe(res => {
      if (res != null) {
        this.emptyCart = false;
        this.cartRows = res.rows;
        this.finalValue = res.pricesObj.finalValue;
        this.qtdOpt = res.qtdOptions;

        for (const i of Object.keys(this.cartRows)) {
          this.qtdItens.push(this.cartRows[i].qtd);
        }
        this.sumQtdItems = this.qtdItens.reduce(this.sumItems, 0);

        this.total = this.finalValue;

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
      } else {
        this.emptyCart = true;
      }
    });
  }

  finishPayment() {
    if (this.decodedToken.cep == null) { return this.router.navigateByUrl(`/finish_register/${this.decodedToken.id}`); }

    const paymentObj = {
      cartItem: this.cartRows,
      price: this.total,
      subTotal: this.finalValue,
      shipping: this.rowsShipping[0].Valor,
      idUser: this.decodedToken.id,
      adress: this.adressInfo
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

  sumItems(a, b) {
    return a + b;
  }

  getToken() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      if (this.decodedToken.cep == null) {
        this.shipBox = true;
      } else {
        this.getShipPrice(this.decodedToken.cep);
      }
    }
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  updateAmount(dados, selectValueAux, idItem) {
    dados.push({ amount: selectValueAux, id_item_cart: idItem });

    this.spinnerService.show();
    this.apiService.updateAmount(dados).subscribe(res => {
      if (res == null) {
        this.spinnerService.hide();
        this.toastrService.error('Erro ao atualizar quantidade', 'Erro!');
      }

      this.spinnerService.hide();
      this.toastrService.success('Quantidade atualizada!', 'Sucesso!');
      return this.ngOnInit();
    });
  }

  listProduct(id: number) {
    this.router.navigateByUrl(`product/${id}`);
  }

  delete(id: number, content) {
    this.spinnerService.show();
    this.apiService.removeFromCart(id).subscribe(res => {
      if (res == null) {
        this.spinnerService.hide();
        this.toastrService.error('Erro ao remover do produto do carrinho', 'Erro!');
      }

      this.spinnerService.hide();
      this.toastrService.success('Produto removido do carrinho!', 'Sucesso!');
      return this.ngOnInit();
    });
  }

  change(event: any, id) {
    this.selectValue = event.value;
    this.updateAmount([], this.selectValue, id);
  }
}
