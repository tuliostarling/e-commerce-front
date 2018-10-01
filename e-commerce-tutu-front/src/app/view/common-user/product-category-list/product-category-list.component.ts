import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from '../../../model/product/product';
import { ProductService } from '../../../service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {


  productsList: ProductModel;
  idCategory: number;


  constructor(
    private router: Router,
    private apiService: ProductService,
    private form: FormBuilder,
  ) { }

  ngOnInit() {
    this.getProducts();


  }

  getProducts() {
    this.apiService.getAllByCategory(this.idCategory).subscribe(res => {
      console.log(res);
    });
  }


}
