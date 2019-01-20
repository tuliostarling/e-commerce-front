import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../model/category/category';
import { CategoryService } from '../../service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  logged = false;
  token: any;
  categoryList: CategoryModel;
  newCategoryList: CategoryModel;
  userId: number;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.getTokenData();

    if (this.token != null) {
      this.userId = this.token.id;
      this.logged = true;
    }

    this.getCategory();
  }

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

  profile() {
    this.router.navigateByUrl('/profile/' + this.userId);
  }

  categoryListLoad(category_id: number) {
    this.router.navigateByUrl('/category_list/' + category_id + '/0');
  }

  about() {
    this.router.navigateByUrl('/about');
  }

  contactUs() {
    this.router.navigateByUrl('/contact_us');
  }
}
