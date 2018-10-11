import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  // @ViewChild(ChildDirective) child: Element;

  idRegistry: number;
  formulario: FormGroup;
  createProductModel: ProductModel;
  rowsCategory: CategoryModel;
  rowsProduct: ProductModel;
  idProduct: number;
  mode: string;

  formData: FormData = new FormData();
  defaultProduct: boolean;
  discount: boolean;
  imagesToUpload: any;

  subProd = [];
  arrEmpty: boolean;
  createNewSubProd = false;

  constructor(
    private apiService: ProductService,
    private apiCategoryService: CategoryService,
    private form: FormBuilder,
    private router: Router,
    public acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acRoute.params
      .subscribe((params: any) => {
        if (params.hasOwnProperty('id')) {
          this.idProduct = params.id;
          this.mode = 'Cadastrar Subproduto';
        } else {
          this.mode = 'Cadastrar';
        }
      });

    this.subProd = [
      {
        id: 1,
        name: 'teste',
        description: 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste'
      },
      {
        id: 2,
        name: 'teste1',
        description: 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste'
      },
      {
        id: 3,
        name: 'teste2',
        description: 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste'
      }
    ];

    this.formulario = this.form.group({
      id_fk: [null],
      defaultProduct: [null, Validators.required],
      name: [null, Validators.required],
      size: [null],
      amount: [null, Validators.required],
      price: [null, Validators.required],
      discount: [null],
      description: [null, Validators.required],
      color: [null, Validators.required]
    });

    this.getCategory();
    this.getProduct();
  }

  getProduct() {
    // this.apiService.getOne(this.idProduct).subscribe((data) => {
    //   this.rowsProduct = data;
    // });

    if (this.subProd.length === 0) {
      this.arrEmpty = true;
    } else {
      this.arrEmpty = false;
    }
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

    this.createProduct(this.createProductModel).then((res => {
      this.idRegistry = res[0].product_id;

      const formImage = new FormData();
      const files: Array<File> = this.imagesToUpload;

      for (let i = 0; i < files.length; i++) {
        formImage.append('file', files[i]);
      }

      this.apiService.addImage(formImage, this.idRegistry).subscribe((resImg) => {
        if (resImg != null) {
          alert('Sucesso ao cadastrar Imagem');
          return this.navToListCoup();
        } else {
          return alert('Erro ao cadastrar Imagem');
        }
      });
    }));
  }

  createProduct<T>(productModel: ProductModel) {
    return new Promise((resolve, reject) => {
      this.apiService.create(productModel)
        .subscribe(res => {
          if (res == null) { return reject(res); }
          resolve(res);
        });
    });
  }

  handleFileSelect(fileInput: any) {
    this.imagesToUpload = <any>fileInput.target.files;
  }

  removeFile(indexe) {
    delete this.imagesToUpload[indexe];
  }

  getDate() {
    return new Date();
  }

  changeDefaultProduct(evt) {
    if (evt.checked === true) {
      this.defaultProduct = true;
      this.formulario.get('defaultProduct').setValue(this.defaultProduct);
    } else {
      this.defaultProduct = false;
      this.formulario.get('defaultProduct').setValue(this.defaultProduct);
    }
  }

  changeDiscount(evt) {
    if (evt.checked === true) {
      this.discount = true;
      this.formulario.get('discount').setValue(this.discount);
    } else {
      this.discount = false;
      this.formulario.get('discount').setValue(this.discount);
    }
  }

  createNewSubP() {
    this.createNewSubProd = !this.createNewSubProd;
  }

  resetForm() {
    // document.getElementById("myForm").reset();
  }

  removeSubProduct(id: number) {
    console.log(id);
  }
}
