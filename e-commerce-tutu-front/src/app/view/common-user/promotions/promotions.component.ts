import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../service';
import { ProductModel } from '../../../model/product/product';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  rowsProduct: ProductModel;
  totalSubProducts: number;
  navLinks: number;
  page: number;
  arrLink = [];
  lastItenArr: number;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

        this.getProducts();
      });
  }

  getProducts() {
    this.apiService.getAllByPromotions(this.page).subscribe(res => {
      if (res != null) {
        this.rowsProduct = res.rows;
        this.totalSubProducts = res.total[0].count;

        this.makeArrNavLinks();
      }
    });
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

}
