import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { ShippingService } from '../../../service/shipping/shipping-api.service';
import { ProductService, UserApiService } from '../../../service';
import { CommentService } from '../../../service/comment/comment-api.service';
import { ProductModel } from '../../../model/product/product';
import { CommentModel } from '../../../model/comment/comment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValueModel, AdressModel } from 'src/app/model/shipping/shipping';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-list-one-product',
  templateUrl: './list-one-product.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-one-product.component.css']
})
export class ListOneProductComponent implements OnInit {

  idProduct: number;
  rowsProduct: ProductModel;
  rowsSubProduct: any;
  productName: string;
  productPrice: number;
  productColor: string;
  productSize: any;
  productDescription: string;
  ArrImg = [];
  imgIndex: number;
  changeImgBool = false;
  installments: number;
  division: number;
  isLogged: boolean;

  rowsComment: Array<CommentModel>;
  totalComment: number;
  avgRating: number;
  ratingStar: number;
  commentForm: CommentModel;
  formulario: FormGroup;
  showCommentBox = false;
  token: any;
  id_user: number;

  rowsShipping: Array<ValueModel>;
  adressInfo: Array<AdressModel>;
  shipBox = true;
  finishRegisterBool = false;
  currentCep: string;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private commentService: CommentService,
    private shippingService: ShippingService,
    private userService: UserApiService,
    private form: FormBuilder,
    private acRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.idProduct = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.form.group({
      id_user: [null, Validators.required],
      id_subproduct: [null, Validators.required],
      comment: [null, Validators.required],
      rating: [null, Validators.required]
    });

    this.getToken();
    this.getProducts();
    this.getUser();
    this.getComments();
  }

  getProducts() {
    this.apiService.getOne(this.idProduct).subscribe(res => {
      if (res != null) {
        this.rowsProduct = res;
        this.rowsSubProduct = res;

        for (const i of Object.keys(this.rowsSubProduct.location_aws)) {
          this.ArrImg.push({ index: i, img: this.rowsSubProduct.location_aws[i] });
        }

        this.productName = this.rowsProduct.name;
        this.productPrice = this.rowsSubProduct.price;
        this.productColor = this.rowsSubProduct.color;
        this.productDescription = this.rowsProduct.description;
        this.productSize = this.rowsSubProduct.size;

        if (this.productPrice >= 80 && this.productPrice < 140) {
          this.installments = 2;
          this.division = Math.round(this.productPrice / this.installments);
        } else if (this.productPrice >= 140 && this.productPrice < 300) {
          this.installments = 3;
          this.division = Math.round(this.productPrice / this.installments);
        } else if (this.productPrice >= 300) {
          this.installments = 4;
          this.division = Math.round(this.productPrice / this.installments);
        } else {
          this.installments = 1;
        }
      }
    });
  }

  getShipPrice(cepVal) {
    if (cepVal === true) { return this.shipBox === true; }

    const validacep = /\d{2}\.\d{3}\-\d{3}/;
    this.currentCep = cepVal.value || cepVal;

    if (this.currentCep.indexOf('-') > -1 === false) { this.currentCep = this.maskCEP(this.currentCep); }

    if (validacep.test(this.currentCep)) {
      const cep = this.currentCep.replace(/\D/g, '');
      const obj = { cep: cep, value: 20 };

      this.shippingService.getShippingValue(obj).subscribe((res) => {
        if (res) {
          this.rowsShipping = res.totalValue;
          this.adressInfo = res.adress;
          this.shipBox = false;
          this.spinnerService.hide();
        }
      });
    } else {
      this.toastrService.error('CEP inválido', 'Erro!');
    }
  }


  maskCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{2})(\d)/, '$1.$2');
    cep = cep.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return cep;
  }

  getUser() {
    if (this.id_user !== undefined) {
      this.isLogged = true;
      this.userService.getListOne(this.id_user).subscribe((res) => {
        if (res !== null) {
          this.getShipPrice(res[0].cep);
        }
      });
    } else {
      this.isLogged = false;
    }
  }

  getComments() {
    this.commentService.getList(this.idProduct).subscribe((res) => {
      if (res) {
        this.avgRating = Math.round(res.avgRating[0].avg);
        this.totalComment = res.total[0].count;
        this.rowsComment = res.rows;
      }
    });
  }

  onSubmit(form: FormGroup) {
    this.formulario.get('id_user').setValue(this.token.id);
    this.formulario.get('id_subproduct').setValue(this.idProduct);
    this.commentForm = form.value;
    this.commentService.create(this.commentForm).subscribe((res) => {
      if (res) {
        this.toastrService.success('Comentario inserido com sucesso!', 'Sucesso!');
        return this.ngOnInit();
      } else { return this.toastrService.error('Erro ao inserir comentario', 'Erro!'); }
    });
  }

  getToken() {
    this.token = this.authService.getTokenData();

    if (this.token != null) {
      this.id_user = this.token.id;
      if (this.token.cep == null) {
        this.finishRegisterBool = true;
      } else { this.finishRegisterBool = false; }
    }
  }

  changeImg(index: number) {
    this.imgIndex = index;
    this.changeImgBool = true;
  }

  showBox() {
    if (this.showCommentBox === true) {
      this.showCommentBox = false;
    } else { this.showCommentBox = true; }
  }

  cart() {
    this.router.navigateByUrl('/cart');
  }

  productList() {
    this.router.navigateByUrl('/category_list/4/0');
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  finishRegister() {
    this.router.navigateByUrl(`/finish_register/${this.id_user}`);
  }
}
