import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from '../../../../service/category/category-api.service';
import { CategoryModel } from '../../../../model/category/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(
    public apiService: CategoryService,
    public router: Router
  ) { }

  public rowsCategory: CategoryModel;

  ngOnInit() {
    this.apiService.getListAll().subscribe((data) => {
      this.rowsCategory = data;
    });
  }

  navToRegsCat() {
    this.router.navigateByUrl('category_register');
  }

  update(id: number) {
    this.router.navigateByUrl('category_edit/' + id);
  }

  delete(id: number) {
    this.apiService.delete(id).subscribe((res) => {
      if (res) { this.ngOnInit(); }
    });
  }
}
