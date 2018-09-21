import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { ngf } from 'angular-file';

import { ProductModel } from '../../../../model/product/product';
import { ProductService } from '../../../../service/product/product-api.service';
import { CategoryService } from '../../../../service';
import { CategoryModel } from '../../../../model/category/category';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  formulario: FormGroup;
  createProductModel: ProductModel;
  rowsCategory: CategoryModel;

  accept = '*';
  files: File[] = [];
  lastFileAt: Date;

  constructor(
    private apiService: ProductService,
    private apiCategoryService: CategoryService,
    private form: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategory();

    this.formulario = this.form.group({
      id_category: [null, Validators.required],
      name: [null, Validators.required],
      size: [null],
      amount: [null, Validators.required],
      price: [null, Validators.required],
      discount: [null, Validators.required],
      description: [null, Validators.required],
      color: [null, Validators.required],
    });
  }

  getCategory() {
    this.apiCategoryService.getListAll().subscribe((data) => {
      this.rowsCategory = data;
    });
  }

  navToListCoup() {
    this.router.navigateByUrl('product_list');
  }

  onSubmit(form) {
    this.createProductModel = form.value;

    this.apiService.create(this.createProductModel)
      .subscribe(res => {
        if (res == null) { return alert('Erro ao cadastrar'); }

        this.navToListCoup();
      });
  }

  getDate() {
    return new Date();
  }
}
