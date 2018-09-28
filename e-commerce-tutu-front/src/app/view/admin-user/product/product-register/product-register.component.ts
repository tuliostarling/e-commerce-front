import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  idRegistry: number;
  formulario: FormGroup;
  formImages: AbstractControl;
  createProductModel: ProductModel;
  rowsCategory: CategoryModel;

  accept = '*';
  filesToUpload: File[] = [];
  lastFileAt: Date;
  base64textString: String = '';
  selectedFile: File = null;
  imgAux: any;
  formData: FormData = new FormData();

  imagem: any;

  defaultProduct: boolean;
  discount: boolean;

  constructor(
    private apiService: ProductService,
    private apiCategoryService: CategoryService,
    private form: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getCategory();

    this.formulario = this.form.group({
      id_fk: [null],
      defaultProduct: [null, Validators.required],
      name: [null, Validators.required],
      size: [null],
      amount: [null, Validators.required],
      price: [null, Validators.required],
      discount: [null],
      description: [null, Validators.required],
      color: [null, Validators.required],
      images: this.form.group({
        imagem: [null]
      })
    });

    this.formImages = this.formulario.controls['images'];
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

    // this.formImg();
    // const formModel = this.prepareSave();

    this.createProduct(this.createProductModel).then((res => {
      this.imagem = this.formData.get('imagem');
      this.idRegistry = res[0].product_id;

      this.apiService.addImage(this.imagem, this.idRegistry).subscribe((resImg) => {
        if (resImg != null) {
          return alert('Sucesso ao cadastrar Imagem');
        } else {
          return alert('Erro ao cadastrar Imagem');
        }
      });
      this.navToListCoup();
    }));

    // return new Promise(resolve => {
    //   this.apiService.create(this.createProductModel)
    //     .subscribe(res => {
    //       this.idRegistry = res[0].product_id;

    //       this.apiService.addImage(formModel, this.idRegistry).subscribe((resImg) => {
    //         if (resImg != null) {
    //           return alert('Sucesso ao cadastrar Imagem');
    //         } else {
    //           return alert('Erro ao cadastrar Imagem');
    //         }

    //       });

    //       this.navToListCoup();
    //     });
    // });
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

  // formImg() {
  //   const reader = new FileReader();
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsBinaryString(this.imgAux);
  // }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      this.selectImg(file, files);
    }
  }

  selectImg(file, files) {
    const reader = new FileReader();
    this.selectedFile = <File>file;

    this.formData.append('imagem', this.selectedFile, this.selectedFile.name);

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  // getImgValues(image: string) {
  //   this.imgAux = image;
  // }

  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //   }
  // }

  // private prepareSave(): any {
  //   const input = new FormData();

  //   input.append('images', this.selectedFile, this.selectedFile.name);

  //   return input;
  // }

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

}
