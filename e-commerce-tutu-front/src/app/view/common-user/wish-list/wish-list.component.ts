import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ProductService } from '../../../service';
import { ProductModel } from '../../../model/product/product';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  productsWishLRows: ProductModel;
  idWish = null;
  token: any;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.token = this.authService.getTokenData();

    if (this.token != null) {
      this.idWish = this.token.wishlist;
    }

    this.getProducts();
  }

  getProducts() {
    this.apiService.getProductsWishL(this.idWish).subscribe(res => {
      if (res != null) {
        this.productsWishLRows = res;
        this.spinnerService.hide();
      }
    });
  }

  delete(id: number, content) {
    this.apiService.removeFromWish(id).subscribe(res => {
      if (res == null) {
        this.toastrService.error('Erro ao remover produto', 'Erro!');
      }

      this.toastrService.success('Produto removido!', 'Sucesso!');
      return this.ngOnInit();
    });
  }

  listProduct(id: number) {
    this.router.navigateByUrl(`product/${id}`);
  }
}
