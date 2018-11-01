import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../../service';
import { ProductModel } from '../../../model/product/product';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  productsWishLRows: ProductModel;
  idWish = null;
  decodedToken: any;

  constructor(
    private router: Router,
    private apiService: ProductService
  ) { }

  ngOnInit() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.idWish = this.decodedToken.wishlist;
    }

    this.getProducts();
  }

  getProducts() {
    this.apiService.getProductsWishL(this.idWish).subscribe(res => {
      if (res != null) {
        this.productsWishLRows = res;
      }
    });
  }

  delete(id: number, content) {
    this.apiService.removeFromWish(id).subscribe(res => {
      if (res == null) {
        alert('Erro');
      }
    });
  }

  listProduct(id: number) {
    this.router.navigateByUrl(`product/${id}`);
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
