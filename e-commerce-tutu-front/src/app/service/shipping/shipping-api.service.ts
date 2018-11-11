import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { infoCepModel, valueShippingModel } from '../../model/shipping/shipping';

@Injectable()
export class ProductService {

    API_URL: string = AppSettings.API_ENDPOINT + 'shipping/';

    constructor(
        private http: HttpClient
    ) { }

    getCepInfo(dadosForm: infoCepModel) {
        return this.http.post<infoCepModel>(`${this.API_URL}shippingInfo/`, dadosForm);
    }

    getShippingValue(dadosForm: valueShippingModel) {
        return this.http.post<valueShippingModel>(`${this.API_URL}shippingPrice/`, dadosForm);
    }

}
