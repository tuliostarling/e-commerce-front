import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../model/category/category';
import { CategoryService } from '../../service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  logged = false;
  decodedToken: any;
  categoryList: CategoryModel;
  newCategoryList: CategoryModel;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
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

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  profile() {
    this.router.navigateByUrl('/profile/' + this.decodedToken.id);
  }

  categoryListLoad(category_id: number) {
    this.router.navigateByUrl('/category_list/' + category_id + '/0');
  }
}
