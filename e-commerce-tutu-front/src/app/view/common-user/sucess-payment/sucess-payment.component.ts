import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../service/payment/payment-api.service';

@Component({
  selector: 'app-sucess-payment',
  templateUrl: './sucess-payment.component.html',
  styleUrls: ['./sucess-payment.component.css']
})
export class SucessPaymentComponent implements OnInit {

  paymentParams: any;
  decodedToken: any;
  idUser: number;
  idCart: number;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private acRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.paymentParams = this.acRoute.snapshot.queryParams;
    this.getToken();
    this.executePayment();
  }


  executePayment() {
    const payObj = {
      user: this.idUser,
      payment: this.paymentParams,
      cart: this.idCart,
    };

    this.paymentService.paymentSucess(payObj).subscribe((res) => {
      console.log(res);
      if (res != null) return this.router.navigateByUrl(`/order_details/${res}`);
    });
  }

  getToken() {
    const t = localStorage.getItem('token');

    if (t != null) {
      this.decodedToken = this.jwtDecode(t);
      this.idUser = this.decodedToken.id;
      this.idCart = this.decodedToken.cart;
    }
  }

  jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
