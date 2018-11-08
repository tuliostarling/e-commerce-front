import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../../../service/product/product-api.service';
import { ProductModel } from '../../../../model/product/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page: number;
  navLinks: number;
  arrLink = [];
  lastItenArr: number;

  constructor(
    public apiService: ProductService,
    public acRoute: ActivatedRoute,
    public router: Router
  ) { }

  public rowsProducts: Array<ProductModel>;
  totalProducts: number;

  ngOnInit() {
    this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

    this.getProducts();
  }

  getProducts() {
    this.apiService.getAll(this.page).subscribe((res) => {
      this.rowsProducts = res.rows;
      this.totalProducts = res.total[0].count;

      this.makeArrNavLinks();
    });

  }

  navToRegsProd() {
    this.router.navigateByUrl('product_register');
  }

  editProduct(id: number) {
    this.router.navigateByUrl('product_register/' + id);
  }

  // Criar Modal de confirmação paara deletar.
  deleteProduct(id: number) {
    this.apiService.delete(id).subscribe((res) => {
      if (res) {
        alert('Produto Deletado com sucesso!');
        return this.ngOnInit();
      }
      return alert('Erro ao deletar Produto');
    });
  }

  makeArrNavLinks() {
    this.navLinks = this.totalProducts / 16;

    // Checks whether the number is decimal
    if (this.navLinks % 1 !== 0 && !isNaN(this.navLinks % 1)) {
      let newNavLinks = parseInt((this.totalProducts / 16).toFixed(0), 10) + 1;

      if (newNavLinks < this.navLinks) {
        newNavLinks += 1;
        this.navLinks = newNavLinks;
      } else {
        this.navLinks = newNavLinks;
      }
    }

    // Checks whether the array exists and is empty
    if (typeof this.arrLink !== 'undefined' && this.arrLink.length <= 0) {
      for (let i = 0; i < this.navLinks; i++) {
        this.arrLink.push({
          value: i,
          num: i + 1
        });
      }
    }

    this.lastItenArr = this.arrLink.length - 1;
  }

  btnClickNext() {
    this.page += 1;

    this.router.navigateByUrl(`/coupon_list/${this.page}`);
  }

  btnClickPrevious() {
    this.page -= 1;

    this.router.navigateByUrl(`/coupon_list/${this.page}`);
  }

  changePage(num: number) {
    this.router.navigateByUrl(`/coupon_list/${num}`);
  }
}
