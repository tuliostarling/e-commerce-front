import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CategoryListComponent } from '../../../view/admin-user/category/category-list/category-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged = false;
  decodedToken: any;
  admin = false;
  userName: string;

  constructor(
    public router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.logged = true;
      this.userName = this.decodedToken.name;

      if (this.decodedToken.admin === true) {
        this.admin = true;
      }
    }
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  registerCategory() {
    this.router.navigateByUrl('/category_list');
  }

  registerCoupon() {
    this.router.navigateByUrl('/coupon_list');
  }

  registerProduct() {
    this.router.navigateByUrl('/product_list');
  }

  shoeList() {
    this.router.navigateByUrl('/shoe_list');
  }
}
