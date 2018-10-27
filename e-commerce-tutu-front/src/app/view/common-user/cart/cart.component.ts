import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  idCart: number;
  idItem: number;
  cartRows: any;
  decodedToken: any;
  productName: string;
  selectValue: number;
  finalValue: number;
  qtdItens: number;
  freight: number;
  total: number;

  constructor(
    private router: Router,
    private apiService: ProductService
  ) { }

  ngOnInit() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.idCart = this.decodedToken.cart;
    }

    this.getProducts();
  }

  getProducts() {
    this.apiService.getProductsCart(this.idCart).subscribe(res => {
      if (res != null) {
        this.cartRows = res[0];
        this.finalValue = res[1].finalValue;

        this.productName = this.cartRows.name;
        this.idItem = this.cartRows[0].id_item;
        this.qtdItens = this.cartRows[0].qtd;
        this.freight = 20;

        this.total = this.finalValue + this.freight;
      }
    });
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
        alert('Erro');
      }
    });
  }

  delete(id: number, content) {
    this.apiService.removeFromCart(id).subscribe(res => {
      if (res == null) {
        alert('Erro');
      }
    });
  }

  change(event: any) {
    this.selectValue = event.value;

    this.updateAmout([], this.selectValue);
  }
}
