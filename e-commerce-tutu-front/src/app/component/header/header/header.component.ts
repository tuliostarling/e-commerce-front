import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../../service/category/category-api.service';
import { CategoryListComponent } from '../../../view/admin-user/category/category-list/category-list.component';
import { CategoryModel } from '../../../model/category/category';

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
  userNameDecoded: string;
  categoryList: CategoryModel;

  constructor(
    public router: Router,
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.logged = true;
      this.userName = this.decodedToken.name;
      this.userNameDecoded = decodeURIComponent(escape(this.userName));

      if (this.decodedToken.admin === true) {
        this.admin = true;
      }
    }

    this.getCategorys()
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

  categoryListLoad(id: number) {
    console.log(id);
    //this.router.navigateByUrl('/');
  }

  cart() {
    this.router.navigateByUrl('/cart');
  }

  getCategorys() {
    // this.categoryService.getListAll().subscribe((res) => {
    //   if (res != null) {
    //     this.categoryList = res;
    //     console.log(this.categoryList);
    //   }
    // })
  }


}
