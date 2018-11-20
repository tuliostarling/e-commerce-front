import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../../service/category/category-api.service';
import { CategoryListComponent } from '../../../view/admin-user/category/category-list/category-list.component';
import { CategoryModel } from '../../../model/category/category';
import { Observable } from 'rxjs';

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
  newCategoryList: CategoryModel;

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

      // check if the name has more than 2 words
      if (this.decodedToken.name.trim().indexOf(' ') !== -1) {
        this.userName = this.decodedToken.name.split(' ').slice(0, 2).join(' ');
      } else {
        this.userName = this.decodedToken.name;
      }
      this.userNameDecoded = decodeURIComponent(escape(this.userName));

      if (this.decodedToken.admin === true) {
        this.admin = true;
      }
    }
    this.getCategory();
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  // getCategory() {
  //   this.categoryService.getListAll().subscribe((res) => {
  //     if (res != null) {
  //       this.categoryList = res;
  //     }
  //   });
  // }

  getListCategory(): Observable<CategoryModel> {
    return new Observable((observer) => {
      if (this.categoryList == null) {
        this.categoryService.getListAll().subscribe((res) => {
          if (res != null) {
            this.categoryList = res;
            observer.next(this.categoryList);
          }
        });
      } else {
        observer.next(this.categoryList);
      }
    });
  }

  getCategory() {
    this.getListCategory()
      .subscribe(res => {
        this.newCategoryList = res;
      });
  }

  logout() {
    localStorage.clear();
    this.reload();
    this.home();
  }

  reload() {
    location.reload();
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  categoryListLoad(category_id: number) {
    this.router.navigateByUrl('/category_list/' + category_id + '/0');
  }

  registerCategory() {
    this.router.navigateByUrl('/category_list');
  }

  registerCoupon() {
    this.router.navigateByUrl('/coupon_list/0');
  }

  registerProduct() {
    this.router.navigateByUrl('/product_list/0');
  }

  cart() {
    this.router.navigateByUrl('/cart');
  }

  profile() {
    this.router.navigateByUrl('/profile/' + this.decodedToken.id);
  }

  dashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  wishList() {
    this.router.navigateByUrl('/wish_list');
  }

  promotions() {
    this.router.navigateByUrl('/promotions/0');
  }
}
