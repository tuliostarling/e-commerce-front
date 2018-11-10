import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CouponService } from '../../../../service/discount-coupon/coupon-api.service';
import { CouponModel } from '../../../../model/discount-coupon/coupon';

@Component({
  selector: 'app-discount-coupon-list',
  templateUrl: './discount-coupon-list.component.html',
  styleUrls: ['./discount-coupon-list.component.css']
})
export class DiscountCouponListComponent implements OnInit {

  page: number;
  navLinks: number;
  arrLink = [];
  lastItenArr: number;

  constructor(
    public apiService: CouponService,
    private acRoute: ActivatedRoute,
    public router: Router
  ) { }

  public rowsCoupon: Array<CouponModel>;
  totalCoupons: number;

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

        this.getListAll();
      });
  }

  getListAll() {
    this.apiService.getListAll(this.page).subscribe((res) => {
      this.rowsCoupon = res.rows;
      this.totalCoupons = res.total[0].count;

      this.makeArrNavLinks();
    });
  }

  navToRegsCat() {
    this.router.navigateByUrl('coupon_register');
  }

  update(id: number) {
    this.router.navigateByUrl('coupon_edit/' + id);
  }

  delete(id: number) {
    this.apiService.delete(id).subscribe((res) => {
      if (res) { this.ngOnInit(); }
    });
  }

  makeArrNavLinks() {
    this.navLinks = this.totalCoupons / 16;

    // Checks whether the number is decimal
    if (this.navLinks % 1 !== 0 && !isNaN(this.navLinks % 1)) {
      let newNavLinks = parseInt((this.totalCoupons / 16).toFixed(0), 10) + 1;

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
