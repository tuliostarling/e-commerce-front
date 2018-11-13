import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { InfoCepModel, ValueModel , RequestShippingModel } from '../../model/shipping/shipping';

@Injectable()
export class ShippingService {

    API_URL: string = AppSettings.API_ENDPOINT + 'shipping/';

    constructor(
        private http: HttpClient
    ) { }

    getCepInfo(cepCode: string) {
        return this.http.post<InfoCepModel>(`${this.API_URL}shippingInfo/`, { cep: cepCode });
    }

    getShippingValue(shipInfo: object) {
        return this.http.post<RequestShippingModel>(`${this.API_URL}shippingPrice/`, shipInfo);
    }

}
