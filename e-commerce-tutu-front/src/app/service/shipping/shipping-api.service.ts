import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { infoCepModel, valueShippingModel } from '../../model/shipping/shipping';

@Injectable()
export class ShippingService {

    API_URL: string = AppSettings.API_ENDPOINT + 'shipping/';

    constructor(
        private http: HttpClient
    ) { }

    getCepInfo(cepCode: string) {
        return this.http.post<infoCepModel>(`${this.API_URL}shippingInfo/`, { cep: cepCode });
    }

    getShippingValue(cepCode: string) {
        return this.http.post<valueShippingModel>(`${this.API_URL}shippingPrice/`, { cep: cepCode });
    }

}
