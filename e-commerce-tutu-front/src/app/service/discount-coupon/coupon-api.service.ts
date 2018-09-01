import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { CouponModel } from '../../model/discount-coupon/coupon';

@Injectable({
    providedIn: 'root'
})
export class CouponService {

    API_URL: string = AppSettings.API_ENDPOINT + 'coupon/';

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<CouponModel>(this.API_URL + 'getall');
    }

    create(dadosForm: CouponModel) {
        return this.http.post<CouponModel>(this.API_URL + 'add/', dadosForm);
    }

    delete(id: number) {
        return this.http.delete<CouponModel>(this.API_URL + 'del/' + id);
    }

}