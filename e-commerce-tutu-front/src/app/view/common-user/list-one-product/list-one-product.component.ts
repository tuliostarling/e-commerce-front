import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../service';
import { ProductModel, SubProductModel } from '../../../model/product/product';

@Component({
  selector: 'app-list-one-product',
  templateUrl: './list-one-product.component.html',
  styleUrls: ['./list-one-product.component.css']
})
export class ListOneProductComponent implements OnInit {

  idProduct: number;
  rowsProduct: ProductModel;
  rowsSubProduct: any;
  productName: string;
  productPrice: number;
  productColor: string;
  productDescription: string;
  ArrImg = [];

  constructor(
    private router: Router,
    private apiService: ProductService,
    private acRoute: ActivatedRoute
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

        // for (const i of Object.keys(this.rowsProduct)) {
        //   this.ArrImg.push({ img: this.rowsSubProduct.locationaws });
        // }

        this.productName = this.rowsProduct.name;
        this.productPrice = this.rowsSubProduct.price;
        this.productColor = this.rowsSubProduct.color;
        this.productDescription = this.rowsProduct.description;
      }
    });
  }

}
