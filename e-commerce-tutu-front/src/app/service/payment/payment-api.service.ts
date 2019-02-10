import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    API_URL: string = AppSettings.API_ENDPOINT + 'payment/';

    constructor(
        private http: HttpClient
    ) { }

    payCart(paymentInfo) {
        return this.http.post<any>(`${this.API_URL}payCart/`, paymentInfo);
    }

    paymentSucess(sucessInfo) {
        return this.http.post<any>(`${this.API_URL}sucessPay/`, sucessInfo);
    }

    paymentCancel(cancelInfo) {
        return this.http.post<any>(`${this.API_URL}cancelPay`, cancelInfo);
    }

}
