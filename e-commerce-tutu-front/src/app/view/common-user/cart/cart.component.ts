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
  selectValue: number;
  finalValue: number;
  qtdItens = [];
  freight: number;
  total: number;
  sumQtdItems: number;

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

        this.idItem = this.cartRows[0].id_item;
        this.freight = 20;

        for (const i of Object.keys(this.cartRows)) {
          this.qtdItens.push(this.cartRows[i].qtd);
        }
        this.sumQtdItems = this.qtdItens.reduce(this.sumItems, 0);

        this.total = this.finalValue + this.freight;
      }
    });
  }

  sumItems(a, b) {
    return a + b;
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

  listProduct(id: number) {
    this.router.navigateByUrl(`product/${id}`);
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
