import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { ShippingService } from '../../../service/shipping/shipping-api.service';
import { ProductService } from '../../../service';
import { CommentService } from '../../../service/comment/comment-api.service';
import { ProductModel } from '../../../model/product/product';
import { CommentModel } from '../../../model/comment/comment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValueModel, AdressModel } from 'src/app/model/shipping/shipping';

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

  rowsComment: CommentModel;
  ratingStar: number;
  commentForm: CommentModel;
  formulario: FormGroup;
  showCommentBox = false;
  decodedToken: any;

  rowsShipping: Array<ValueModel>;
  adressInfo: Array<AdressModel>;
  shipBox: boolean;
  currentCep: string;

  constructor(
    private router: Router,
    private apiService: ProductService,
    private commentService: CommentService,
    private shippingService: ShippingService,
    private form: FormBuilder,
    private acRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.idProduct = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.formulario = this.form.group({
      id_user: [null, Validators.required],
      id_subproduct: [null, Validators.required],
      comment: [null, Validators.required],
      rating: [null, Validators.required]
    });

    this.getToken();
    this.getProducts();
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
    const validacep = /\d{2}\.\d{3}\-\d{3}/;
    this.currentCep = cepVal.value;

    if (validacep.test(this.currentCep)) {
      const cep = this.currentCep.replace(/\D/g, '');
      const obj = { cep: cep, value: this.productPrice };

      this.shippingService.getShippingValue(obj).subscribe((res) => {
        if (res) {
          this.rowsShipping = res.totalValue;
          this.adressInfo = res.adress;
          this.shipBox = true;
        }
      });
    } else {
      this.toastrService.error('CEP inválido', 'Erro!');
    }
  }

  getComments() {
    this.commentService.getList(this.idProduct).subscribe((res) => {
      if (res) { return this.rowsComment = res; }
    });
  }

  onSubmit(form: FormGroup) {
    this.formulario.get('id_user').setValue(this.decodedToken.id);
    this.formulario.get('id_subproduct').setValue(this.idProduct);
    this.formulario.get('rating').setValue(3);
    this.commentForm = form.value;
    this.commentService.create(this.commentForm).subscribe((res) => {
      if (res) {
        this.toastrService.success('Comentario inserido com sucesso!', 'Sucesso!');
        return this.ngOnInit();
      } else { return this.toastrService.error('Erro ao inserir comentario', 'Erro!'); }
    });
  }

  getToken() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      if (this.decodedToken.cep == null) {
        this.shipBox = true;
      } else { this.shipBox = false; }
    }
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
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
}
