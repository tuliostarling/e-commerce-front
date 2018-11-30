import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../../service/category/category-api.service';
import { CategoryListComponent } from '../../../view/admin-user/category/category-list/category-list.component';
import { CategoryModel } from '../../../model/category/category';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged = false;
  token: any;
  admin = false;
  userName: string;
  userNameDecoded: string;
  categoryList: CategoryModel;
  newCategoryList: CategoryModel;
  userId: number;

  constructor(
    public router: Router,
    private categoryService: CategoryService,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.getTokenData();

    if (this.token != null) {
      this.logged = true;
      this.userId = this.token.id;

      // check if the name has more than 2 words
      if (this.token.name.trim().indexOf(' ') !== -1) {
        this.userName = this.token.name.split(' ').slice(0, 2).join(' ');
      } else {
        this.userName = this.token.name;
      }
      this.userNameDecoded = decodeURIComponent(escape(this.userName));

      if (this.token.admin === true) {
        this.admin = true;
      }
    }
    this.getCategory();
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
    this.router.navigateByUrl('/profile/' + this.userId);
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

  home_controller() {
    this.router.navigateByUrl('/home_controller_list');
  }
}
