import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    public acRoute: ActivatedRoute,
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

  delete(id: number) {
    this.apiService.delete(id).subscribe((res) => {
      if (res) { this.ngOnInit(); }
    });
  }
}
