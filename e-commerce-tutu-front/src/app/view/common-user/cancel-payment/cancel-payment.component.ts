import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../service/payment/payment-api.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-cancel-payment',
  templateUrl: './cancel-payment.component.html',
  styleUrls: ['./cancel-payment.component.css']
})
export class CancelPaymentComponent implements OnInit {
  paymentParams: any;
  token: any;
  idUser: number;
  idCart: number;
  resAux: any;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private acRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = this.authService.getTokenData();
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

    this.paymentService.paymentCancel(payObj).subscribe((res) => {
      if (res != null) {
        this.resAux = res.id;
      }
    });
  }
  getToken() {
    if (this.token != null) {
      this.idUser = this.token.id;
      this.idCart = this.token.cart;
    }
  }
}
