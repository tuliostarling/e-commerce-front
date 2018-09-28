import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { ProductModel, ImageModel } from '../../model/product/product';

@Injectable()
export class ProductService {

    API_URL: string = AppSettings.API_ENDPOINT + 'product/';

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<ProductModel>(this.API_URL + 'listall/');
    }

    // geOne(id: number) {
    //     return this.http.post<ProductModel>(this.API_URL + 'get/', id);
    // }

    create(dadosForm: ProductModel) {
        return this.http.post<ProductModel>(this.API_URL + 'add/', dadosForm);
    }

    addImage(dadosForm: FormData, id: number) {
        return this.http.post(this.API_URL + 'addImages/' + id, dadosForm);
    }

    // update(dadosForm: ProductModel){
    //     return this.http.put<ProductModel>(this.API_URL + 'update/', dadosForm);
    // }

    // delete(id: number) {
    //     return this.http.delete<ProductModel>(this.API_URL + 'del/' + id);
    // }
}
