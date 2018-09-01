import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { ProductModel } from '../../../../model/product/product';
import { ProductService } from '../../../../service/product/product-api.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  formulario: FormGroup;
  createProductModel: ProductModel;

  constructor(
    private apiService: ProductService,
    private form: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      id_category: [null, Validators.required],
      name: [null, Validators.required],
      size: [null, Validators.required],
      price: [null, Validators.required],
      discount: [null, Validators.required],
      description: [null, Validators.required],
      color: [null, Validators.required],
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

}
