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

  productsList: ProductModel;
  idCategory: number;
  categoryName: string;
  rowsProduct: ProductModel;
  oldPrice: number;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private apiServiceCategory: CategoryService,
    private form: FormBuilder,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acRoute.url
      .subscribe(_ => {
        this.idCategory = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);
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
    this.apiService.getAllByCategory(this.idCategory).subscribe(res => {
      if (res != null) {
        console.log(res);
        this.rowsProduct = res;
        // this.oldPrice = this.rowsProduct.oldPrice;
      }
    });
  }
}
