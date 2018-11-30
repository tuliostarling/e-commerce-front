import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../service/payment/payment-api.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sucess-payment',
  templateUrl: './sucess-payment.component.html',
  styleUrls: ['./sucess-payment.component.css']
})
export class SucessPaymentComponent implements OnInit {

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

    this.paymentService.paymentSucess(payObj).subscribe((res) => {
      if (res != null) {
        this.resAux = res;
      }
    });
  }

  clickLink() {
    this.router.navigateByUrl(`/order_details/${this.resAux}`);
  }

  getToken() {
    if (this.token != null) {
      this.idUser = this.token.id;
      this.idCart = this.token.cart;
    }
  }
}
