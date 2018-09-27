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
  filesToUpload: File[] = [];
  lastFileAt: Date;
  base64textString = String[''];

  imgNameAux: string;
  imgTypeAux: string;
  imgAux: any;

  imagesFile: AbstractControl;

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
      files: [null, Validators.required]
    });

    this.imagesFile = this.formulario.controls['imagesFile'];
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
    this.formImg();

    this.apiService.create(this.createProductModel)
      .subscribe(res => {
        if (res == null) { return alert('Erro ao cadastrar'); }

        this.navToListCoup();
      });
  }

  formImg() {
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.imgAux);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.formulario.value.files = this.base64textString;
  }

  getImgValues(name: string, type: string, image: string) {
    this.imgNameAux = name;
    this.imgTypeAux = type;
    this.imgAux = image;
  }

  upload() {
    const formData: any = new FormData();
    const files: File[] = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append('uploads[]', files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    this.apiService.create(formData)
      .subscribe(filesUp => console.log('files', filesUp));
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  getDate() {
    return new Date();
  }
}
