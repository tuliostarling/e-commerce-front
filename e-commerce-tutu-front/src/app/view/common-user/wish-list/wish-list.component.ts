import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProductsWishL(1).subscribe(res => {
      if (res != null) {
        console.log(res);
      }
    });
  }

}
