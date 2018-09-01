import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CouponService } from '../../../../service/discount-coupon/coupon-api.service';
import { CouponModel } from '../../../../model/discount-coupon/coupon';

@Component({
  selector: 'app-discount-coupon-list',
  templateUrl: './discount-coupon-list.component.html',
  styleUrls: ['./discount-coupon-list.component.css']
})
export class DiscountCouponListComponent implements OnInit {

  constructor(
    public apiService: CouponService,
    public router: Router
  ) { }

  public rowsCoupon: CouponModel;

  ngOnInit() {
    this.apiService.getListAll().subscribe((data) => {
      this.rowsCoupon = data;
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
}
