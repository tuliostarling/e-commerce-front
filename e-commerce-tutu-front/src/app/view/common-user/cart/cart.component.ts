import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../service';
import { CartModel } from '../../../model/cart/cart';
import { ValueModel, AdressModel } from '../../../model/shipping/shipping';
import { ShippingService } from '../../../service/shipping/shipping-api.service';

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
  optSelected = [];
  qtdItens = [];
  total: number;
  sumQtdItems: number;
  installments: number;
  division: number;

  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  defaultPosition: number;


  rowsShipping: Array<ValueModel>;
  adressInfo: Array<AdressModel>;
  shipBox: boolean;
  currentCep: string;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private shipService: ShippingService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
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
        this.cartRows = res.rows;
        this.finalValue = res.pricesObj.finalValue;
        this.qtdOpt = res.qtdOptions;

        for (let i = 0; i < this.arr.length; i++) {
          if (this.cartRows[0].qtd === this.arr[i]) {
            this.defaultPosition = this.arr[i];
          }
        }
        this.idItem = this.cartRows[0].id_item;

        for (const i of Object.keys(this.cartRows)) {
          this.qtdItens.push(this.cartRows[i].qtd);
        }
        this.sumQtdItems = this.qtdItens.reduce(this.sumItems, 0);

        this.total = this.finalValue;//+ this.freight;

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

        // const toot = this.cartRows.map(x => x.qtd).reduce((acc, curr) => acc += curr - 1, 0);
        // console.log(toot);
      }
    });
  }


  getShipPrice(cepVal) {
    if (cepVal === true) return this.shipBox === true;

    const validacep = /\d{2}\.\d{3}\-\d{3}/;
    this.currentCep = cepVal.value;

    if (validacep.test(this.currentCep)) {
      const cep = this.currentCep.replace(/\D/g, '');
      const obj = { cep: cep, value: this.finalValue };

      this.shipService.getShippingValue(obj).subscribe((res) => {
        if (res) {
          this.rowsShipping = res.totalValue;
          this.adressInfo = res.adress;
          this.shipBox = false;
        }
      });
    } else {
      this.toastrService.error('CEP inválido', 'Erro!');
    }
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
      } else { this.shipBox = false; }
    }
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  updateAmout(dados, selectValueAux) {
    dados.push({ amount: selectValueAux, id_item: this.idItem });

    this.apiService.updateAmount(dados).subscribe(res => {
      if (res == null) {
        this.toastrService.error('Erro ao atualizar quantidade', 'Erro!');
      }

      this.toastrService.success('Quantidade atualizada!', 'Sucesso!');
      return this.ngOnInit();
    });
  }

  listProduct(id: number) {
    this.router.navigateByUrl(`product/${id}`);
  }

  delete(id: number, content) {
    this.apiService.removeFromCart(id).subscribe(res => {
      if (res == null) {
        this.toastrService.error('Erro ao remover do produto do carrinho', 'Erro!');
      }

      this.toastrService.success('Produto removido do carrinho!', 'Sucesso!');
      return this.ngOnInit();
    });
  }

  change(event: any) {
    this.selectValue = event.value;

    this.updateAmout([], this.selectValue);
  }
}
