import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductModel, SubProductModel } from '../../../../model/product/product';
import { ProductService } from '../../../../service/product/product-api.service';
import { CategoryService } from '../../../../service';
import { CategoryModel } from '../../../../model/category/category';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  idMainProduct: number;
  idSubProduct: number;

  formulario: FormGroup;
  formularioSubProduct: FormGroup;
  createProductModel: ProductModel;
  createSubProductModel: SubProductModel;
  rowsCategory: CategoryModel;
  rowsProduct: ProductModel;
  rowsSubProducts: SubProductModel;
  idProduct: number;
  mode: string;

  formData: FormData = new FormData();
  promotion: boolean;
  discount: boolean;
  imagesToUpload: any;

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

    this.formulario = this.form.group({
      id_category: [null],
      name: [null, Validators.required],
      model: [null, Validators.required],
      type: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.formularioSubProduct = this.form.group({
      size: [null],
      amount: [null, Validators.required],
      price: [null, Validators.required],
      old_price: [null, Validators.required],
      discount: [null],
      color: [null, Validators.required],
      material: [null],
      promotion: [null]
    });

    this.getCategory();
    this.getProduct();
  }

  getProduct() {
    this.apiService.getOneMain(this.idProduct).subscribe((data) => {
      this.idMainProduct = data[0].id;
      this.rowsProduct = data;
      this.loadForm(this.rowsProduct, this.formulario)

      this.apiService.getAllSubProducts(this.rowsProduct[0].id).subscribe((res) => {
        if (res) this.rowsSubProducts = res;
        console.log(this.rowsSubProducts);
        //this.loadForm(this.rowsSubProducts, this.formularioSubProduct);
      });
    });
  }

  getCategory() {
    this.apiCategoryService.getListAll().subscribe((data) => {
      this.rowsCategory = data;
    });
  }

  onSubmit(form: FormGroup) {
    this.createProductModel = form.value;

    if (this.mode == 'Cadastrar') {
      this.apiService.create(this.createProductModel).subscribe(res => {
        if (res) {
          alert('Produto Cadastro com Sucesso!');
          return this.navToListCoup();
        }
        return alert('Erro ao Cadastrar Produto, Tente Novamente');
      });
    }

    if (this.mode == 'Cadastrar Subproduto') {
      this.createSubProduct(form.value).then((res => {
        this.idSubProduct = res[0].id_subproduct;

        const formImage = new FormData();
        const files: Array<File> = this.imagesToUpload;

        for (let i = 0; i < files.length; i++) {
          formImage.append('file', files[i]);
        }

        this.apiService.addImage(formImage, this.idSubProduct).subscribe((resImg) => {
          //if (resImg != null) {
          //   alert('Sucesso ao SubProduto');
          //   this.cleanAcordion(form);
          //   return this.ngOnInit();
          // } else {
          //   return alert('Erro ao cadastrar Imagem');
          // }
        });
      }));
    }
  }

  createSubProduct<T>(subProductModel: SubProductModel) {
    return new Promise((resolve, reject) => {
      this.apiService.createSubProduct(subProductModel, this.rowsProduct[0].id)
        .subscribe(res => {
          if (res == null) { return reject(res); }
          resolve(res);
        });
    });
  }

  updateMainProduct(form) {
    this.apiService.update(form.value, this.idMainProduct).subscribe((res) => {
      if (res) return this.ngOnInit();
      return alert('Erro Ao Atualizar Produto');
    });
  }

  loadForm(productInfo, formGroup: FormGroup) {
    const newData = new Array<any>();
    const data: any = productInfo[0];

    Object.keys(formGroup.controls).forEach(row => {
      const control = formGroup.get(row);
      control.setValue(data[row]);
      newData.push({
        row: row,
        value: data[row]
      });
    });
  }


  updateSubProduct(form) {
    console.log(form.value);
    // this.ngOnInit();
  }

  removeSubProduct(id: number) {
    this.apiService.deleteSubProduct(id).subscribe((res) => {
      if (res) {
        alert('Variação deletada com sucesso!');
        return this.ngOnInit();
      }
      alert('Erro ao deletar variação!');
    });
  }

  cleanAcordion(form) {
    form.reset();
    this.imagesToUpload = [];
    this.discount = false;
    this.formularioSubProduct.get('discount').setValue(this.discount);
    this.promotion = false;
    this.formularioSubProduct.get('promotion').setValue(this.promotion);
  }

  handleFileSelect(fileInput: any) {
    this.imagesToUpload = <any>fileInput.target.files;
  }

  removeFile(indexe, toot) {
    console.log(indexe)
    console.log(toot)
    //delete this.imagesToUpload[indexe];
  }

  navToListCoup() {
    this.router.navigateByUrl('product_list');
  }


  changeDiscount(evt) {
    if (evt.checked === true) {
      this.discount = true;
      this.formularioSubProduct.get('discount').setValue(this.discount);
    } else {
      this.discount = false;
      this.formularioSubProduct.get('discount').setValue(this.discount);
    }
  }

  changePromotionProduct(evt) {
    if (evt.checked === true) {
      this.promotion = true;
      this.formularioSubProduct.get('promotion').setValue(this.promotion);
    } else {
      this.promotion = false;
      this.formularioSubProduct.get('promotion').setValue(this.promotion);
    }
  }

}
