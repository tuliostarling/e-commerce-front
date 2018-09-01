import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { CategoryModel } from '../../../../model/category/category';
import { CategoryService } from '../../../../service/category/category-api.service';

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.css']
})
export class CategoryRegisterComponent implements OnInit {

  formulario: FormGroup;
  createCategoryModel: CategoryModel;

  constructor(
    private service: CategoryService,
    private form: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      category: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  navToListCat() {
    this.router.navigateByUrl('category_list');
  }

  onSubmit(form) {
    this.createCategoryModel = form.value;

    this.service.create(this.createCategoryModel)
      .subscribe(res => {
        if (res == null) return alert('Erro ao cadastrar');

        this.navToListCat();
      });
  }

}
