import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../service';
import { ProductModel } from '../../../model/product/product';
import { ToastrService } from 'ngx-toastr';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  rowsProduct: Array<ProductModel>;
  totalSubProducts: number;
  navLinks: number;
  page: number;
  arrLink = [];
  lastItenArr: number;

  dadosCart = [];
  dadosWish = [];
  idCart: number;
  idWish: number;
  token: any;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private acRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.spinnerService.show();
        this.token = this.authService.getTokenData();
        this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

        const t = localStorage.getItem('token');

        if (this.token != null) {
          this.idCart = this.token.cart;
          this.idWish = this.token.wishlist;
        }

        this.getProducts();
      });
  }

  getProducts() {
    this.apiService.getAllByPromotions(this.page).subscribe(res => {
      if (res != null) {
        this.rowsProduct = res.rows;
        this.totalSubProducts = res.total[0].count;

        this.makeArrNavLinks();
        this.spinnerService.hide();
      }
    });
  }

  listProduct(id: number) {
    this.router.navigateByUrl(`product/${id}`);
  }

  makeArrNavLinks() {
    this.navLinks = this.totalSubProducts / 16;

    // Checks whether the number is decimal
    if (this.navLinks % 1 !== 0 && !isNaN(this.navLinks % 1)) {
      let newNavLinks = parseInt((this.totalSubProducts / 16).toFixed(0), 10);

      if (newNavLinks < this.navLinks) {
        newNavLinks += 1;
        this.navLinks = newNavLinks;
      } else {
        this.navLinks = newNavLinks;
      }
    }

    this.arrLink = [];
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

    this.router.navigateByUrl(`/promotions/${this.page}`);
  }

  btnClickPrevious() {
    this.page -= 1;

    this.router.navigateByUrl(`/promotions/${this.page}`);
  }

  changePage(num: number) {
    this.router.navigateByUrl(`/promotions/${num}`);
  }

  addProductToCart(id: number) {
    this.dadosCart.push({ id_cart: this.idCart, id_subproduct: id, amount: 1 });

    this.apiService.addToCart(this.dadosCart).subscribe(res => {
      if (res != null) {
        this.toastrService.success('Produto inserido no carrinho!', 'Sucesso!');
      }
    });
  }

  addProductToWishList(id: number) {
    this.dadosWish.push({ id_wishlist: this.idWish, id_subproduct: id });

    this.apiService.addToWishList(this.dadosWish).subscribe(res => {
      if (res != null) {
        this.toastrService.success('Produto inserido na lista de desejos!', 'Sucesso!');
      }
    });
  }
}
