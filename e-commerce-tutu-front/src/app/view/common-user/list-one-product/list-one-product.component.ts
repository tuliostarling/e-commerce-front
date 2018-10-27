import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../service';
import { ProductModel, SubProductModel } from '../../../model/product/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private router: Router,
    private apiService: ProductService,
    private acRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.idProduct = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.getProducts();
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
      }
    });
  }

  changeImg(index: number) {
    this.imgIndex = index;
    this.changeImgBool = true;
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
