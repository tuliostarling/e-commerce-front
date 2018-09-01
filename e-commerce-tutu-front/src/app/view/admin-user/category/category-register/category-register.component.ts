import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  idCategory: number;
  mode: string;
  rowsCategory: CategoryModel;

  constructor(
    private apiService: CategoryService,
    private form: FormBuilder,
    public acRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.acRoute.params
      .subscribe((params: any) => {
        if (params.hasOwnProperty('id')) {
          this.idCategory = params.id;
          this.mode = 'Editar';
          this.recoverRegistry();
        } else {
          this.mode = 'Cadastrar';
        }
      });

    this.formulario = this.form.group({
      category: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  recoverRegistry() {
    if (this.idCategory !== undefined) {
      this.apiService.getListOne(this.idCategory).subscribe((data) => {
        if (data) {
          this.formulario = this.form.group({
            id: [data[0].id],
            category: [data[0].category, Validators.required],
            type: [data[0].type, Validators.required],
          });
        } else {
          alert('erro');
        }
      });
    }
  }

  navToListCat() {
    this.router.navigateByUrl('category_list');
  }

  onSubmit(form) {
    this.createCategoryModel = form.value;

    if (this.idCategory === undefined) {
      this.apiService.create(this.createCategoryModel).subscribe(res => {
        if (res == null) { return alert('Erro ao cadastrar'); }

        this.navToListCat();
      });
    } else {
      this.apiService.update(this.createCategoryModel).subscribe((res) => {
        if (res == null) { return alert('Erro ao cadastrar'); }

        this.navToListCat();
      });
    }
  }

}
