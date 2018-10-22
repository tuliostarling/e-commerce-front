import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../../../model/product/product';
import { ProductService, CategoryService } from '../../../service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  idCategory: number;
  categoryName: string;
  rowsProduct: ProductModel;
  totalSubProducts: number;
  oldPrice: number;
  navLinks: number;
  page: number;
  arrLink = [];
  lastItenArr: number;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private apiServiceCategory: CategoryService,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.idCategory = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);
        this.page = parseInt(this.acRoute.snapshot.paramMap.get('page'), 10);

        this.getCategory();
        this.getProducts();
      });
  }

  getCategory() {
    this.apiServiceCategory.getListOne(this.idCategory).subscribe(res => {
      if (res != null) {
        const category = document.getElementById('category');

        this.categoryName = res[0].category;

        category.setAttribute('style', `background: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${res[0].location_aws});`);
      }
    });
  }

  getProducts() {
    this.apiService.getAllByCategory(this.idCategory, this.page).subscribe(res => {
      if (res != null) {
        this.rowsProduct = res.rows;
        this.totalSubProducts = res.total[0].count;
        // this.oldPrice = this.rowsProduct.oldPrice;

        this.makeArrNavLinks();
      }
    });
  }

  makeArrNavLinks() {
    this.navLinks = this.totalSubProducts / 16;

    // Checks whether the number is decimal
    if (this.navLinks % 1 !== 0 && !isNaN(this.navLinks % 1)) {
      let newNavLinks = parseInt((this.totalSubProducts / 16).toFixed(0), 10) + 1;

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

    this.router.navigateByUrl(`/category_list/${this.idCategory}/${this.page}`);
  }

  btnClickPrevious() {
    this.page -= 1;

    this.router.navigateByUrl(`/category_list/${this.idCategory}/${this.page}`);
  }

  changePage(num: number) {
    this.router.navigateByUrl(`/category_list/${this.idCategory}/${num}`);
  }
}
