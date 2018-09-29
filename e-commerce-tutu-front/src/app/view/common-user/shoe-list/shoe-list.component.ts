import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoe-list.component.html',
  styleUrls: ['./shoe-list.component.css']
})
export class ShoeListComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  listOneProduct(id: number) {
    this.router.navigateByUrl('product/' + id);
  }

}
