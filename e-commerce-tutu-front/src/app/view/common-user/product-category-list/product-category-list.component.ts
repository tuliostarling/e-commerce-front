import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../../../model/product/product';
import { ProductService, CategoryService } from '../../../service';
import { FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  idCategory: number;
  categoryName: string;
  rowsProduct: Array<ProductModel>;
  totalSubProducts: number;
  oldPrice: number;
  navLinks: number;
  page: number;
  arrLink = [];
  lastItenArr: number;

  dadosCart = [];
  dadosWish = [];
  idCart: number;
  idWish: number;
  decodedToken: any;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private apiServiceCategory: CategoryService,
    private acRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.idCategory = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);
        this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

        const t = localStorage.getItem('token');

        if (t != null) {
          this.decodedToken = this.jwtDecode(t);
          this.idCart = this.decodedToken.cart;
          this.idWish = this.decodedToken.wishlist;
        }

        this.getCategory();
        this.getProducts();
      });
  }

  getCategory() {
    this.apiServiceCategory.getListOne(this.idCategory).subscribe(res => {
      if (res != null) {
        const category = document.getElementById('category');

        this.categoryName = res[0].category;

        category.setAttribute('style', `background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${res[0].location_aws})
                                center; background-size: cover; background-position: center center; background-repeat: no-repeat;`);
      }
    });
  }

  getProducts() {
    this.rowsProduct = [];

    this.apiService.getAllByCategory(this.idCategory, this.page).subscribe(res => {
      if (res != null) {
        this.rowsProduct = res.rows;
        this.totalSubProducts = res.total[0].count;
        // this.oldPrice = this.rowsProduct.oldPrice;

        this.makeArrNavLinks();
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
      let newNavLinks = parseInt((this.totalSubProducts / 16).toFixed(0), 10) + 1;

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

    this.router.navigateByUrl(`/category_list/${this.idCategory}/${this.page}`);
  }

  btnClickPrevious() {
    this.page -= 1;

    this.router.navigateByUrl(`/category_list/${this.idCategory}/${this.page}`);
  }

  changePage(num: number) {
    this.router.navigateByUrl(`/category_list/${this.idCategory}/${num}`);
  }

  addProductToCart(id: number) {
    if (this.decodedToken != null) {
      this.dadosCart.push({ id_cart: this.idCart, id_subproduct: id, amount: 1 });
      this.apiService.addToCart(this.dadosCart).subscribe(res => {
        this.dadosCart = [];
        if (res.sucess === true) return this.toastrService.success('Produto inserido no carrinho!', 'Sucesso!');
        else if (res.error) return this.toastrService.warning('Produto ja está no carrinho', 'Aviso!');
      });
    }else {
      return this.toastrService.warning('Favor criar uma conta para ter seu carrinho !', 'Aviso!');
    }
  }

  addProductToWishList(id: number) {
    this.dadosWish.push({ id_wishlist: this.idWish, id_subproduct: id });

    this.apiService.addToWishList(this.dadosWish).subscribe(res => {
      if (res !== null) {
        this.toastrService.success('Produto inserido na lista de desejos!', 'Sucesso!');
      }
    });
  }

  cart() {
    this.router.navigateByUrl('/cart');
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
