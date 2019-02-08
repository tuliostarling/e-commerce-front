import { Component, OnInit } from '@angular/core';
import { HomeApiService } from '../../service/home/home-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css']
})
export class TopSellingProductsComponent implements OnInit {

  first4positions = [];
  second4positions = [];
  third4positions = [];
  dadosWish = [];
  dadosCart = [];

  idWish: number;
  idCart: number;
  token: any;

  constructor(
    public homeService: HomeApiService,
    private productService: ProductService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  actualProducts: any;
  actualProductsOrdered: any;

  ngOnInit() {
    this.getActualProductsInHome();

    this.spinnerService.show();
    this.token = this.authService.getTokenData();

    if (this.token != null) {
      this.idCart = this.token.cart;
      this.idWish = this.token.wishlist;
    }
  }

  getActualProductsInHome() {
    this.homeService.getHomeProducts().subscribe(res => {
      if (res != null) {
        this.actualProducts = res;

        this.actualProductsOrdered =
          this.actualProducts.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));

        const arrLength = this.actualProductsOrdered.length;

        if (arrLength < 4) {
          this.first4positions = this.actualProductsOrdered.slice(0, arrLength);
        } else if (arrLength === 4) {
          this.first4positions = this.actualProductsOrdered.slice(0, 4);
        } else if (arrLength > 4 && arrLength < 8) {
          this.first4positions = this.actualProductsOrdered.slice(0, 4);
          this.second4positions = this.actualProductsOrdered.slice(4, arrLength);
        } else if (arrLength === 8) {
          this.first4positions = this.actualProductsOrdered.slice(0, 4);
          this.second4positions = this.actualProductsOrdered.slice(4, 8);
        } else if (arrLength > 8 && arrLength < 12) {
          this.first4positions = this.actualProductsOrdered.slice(0, 4);
          this.second4positions = this.actualProductsOrdered.slice(4, 8);
          this.third4positions = this.actualProductsOrdered.slice(8, arrLength);
        } else if (arrLength === 12) {
          this.first4positions = this.actualProductsOrdered.slice(0, 4);
          this.second4positions = this.actualProductsOrdered.slice(4, 8);
          this.third4positions = this.actualProductsOrdered.slice(8, 11);
        }

        console.log(this.first4positions);
      }
    });
  }

  addProductToCart(id: number) {
    if (this.token != null) {
      this.spinnerService.show();
      this.dadosCart.push({ id_cart: this.idCart, id_subproduct: id, amount: 1 });
      this.productService.addToCart(this.dadosCart).subscribe(res => {
        this.dadosCart = [];
        if (res.sucess === true) {
          this.spinnerService.hide();
          return this.toastrService.success('Produto inserido no carrinho!', 'Sucesso!');
        } else if (res.error) {
          this.spinnerService.hide();
          return this.toastrService.warning('Produto ja está no carrinho', 'Aviso!');
        }
      });
    } else {
      return this.toastrService.warning('Favor criar uma conta para ter seu carrinho !', 'Aviso!');
    }
  }

  addProductToWishList(id: number) {
    this.spinnerService.show();
    this.dadosWish.push({ id_wishlist: this.idWish, id_subproduct: id });

    this.productService.addToWishList(this.dadosWish).subscribe(res => {
      if (res !== null) {
        this.spinnerService.hide();
        this.toastrService.success('Produto inserido na lista de desejos!', 'Sucesso!');
      }
    });
  }
}
