import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserApiService } from '../../../service/user/user-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: number;
  hashId: any;

  formulario: FormGroup;

  adress: string;
  neighborhood: string;
  state: string;
  city: string;
  cep: number;
  total: number;
  shipping: number;
  status: string;
  date_hour: any;
  delivery_status: string;
  key: string;
  name: string;
  email: string;

  items = [];

  constructor(
    private router: Router,
    private form: FormBuilder,
    private userService: UserApiService,
    private acRoute: ActivatedRoute
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.hashId = e.url.split('/');
      }
    });
  }

  ngOnInit() {
    this.getPurchaseDetail();

    this.formulario = this.form.group({
      line1: [null],
      neighborhood: [null],
      state: [null],
      city: [null],
      cep: [null],
      email: [null],
      name: [null],
      status: [null],
      hour: [null],
      date: [null],
      shipping: [null],
      total: [null],
      item_name: [null],
      item_price: [null],
      item_quantity: [null],
      delivery_status: [null],
      key: [null]
    });
  }

  getPurchaseDetail() {
    this.userService.getUserPurchaseDetail(this.hashId[2]).subscribe(res => {
      this.adress = res[0].adress.line1;
      this.neighborhood = res[0].adress.line2;
      this.state = res[0].adress.state;
      this.city = res[0].adress.city;
      this.cep = res[0].adress.postal_code;
      this.total = res[0].sale.amount.total;
      this.shipping = res[0].sale.amount.details.shipping;
      this.status = res[0].sale.state;
      this.date_hour = res[0].sale.create_time;
      this.delivery_status = res[0].status;
      this.name = res[0].name;
      this.email = res[0].email;

      for (const i of Object.keys(res)) {
        this.items = res;
      }
    });
  }

}

