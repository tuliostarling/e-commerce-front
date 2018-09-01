import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../../../service/product/product-api.service';
import { ProductModel } from '../../../../model/product/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    public apiService: ProductService,
    public acRoute: ActivatedRoute,
    public router: Router
  ) { }

  public rowsProducts: ProductModel;

  ngOnInit() {
    this.apiService.getAll().subscribe((data) => {
      this.rowsProducts = data;
    });
  }

  navToRegsProd() {
    this.router.navigateByUrl('product_register');
  }

  update(id: number) {
    this.router.navigateByUrl('product_edit/' + id);
  }

  // delete(id: number) {
  //   this.apiService.delete(id).subscribe((res) => {
  //     if (res) { this.ngOnInit(); }
  //   });
  // }
}
