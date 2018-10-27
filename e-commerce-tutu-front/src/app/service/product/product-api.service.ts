import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '../../app.settings';
import { ProductModel, RequestProductModel, SubProductModel, SubProductListModel } from '../../model/product/product';

@Injectable()
export class ProductService {

    API_URL: string = AppSettings.API_ENDPOINT + 'product/';

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<ProductModel>(`${this.API_URL}listall/Products`);
    }

    getOne(id: number) {
        return this.http.get<ProductModel>(`${this.API_URL}listone/${id}`);
    }

    getAllByCategory(id: number, page: number) {
        return this.http.get<RequestProductModel>(`${this.API_URL}listBycategory/${id}/${page}`);
    }

    getAllByPromotions(id: number) {
        return this.http.get<RequestProductModel>(`${this.API_URL}listAll/Promotions/${id}`);
    }

    getOneMain(id: number) {
        return this.http.get<ProductModel>(`${this.API_URL}listoneMain/${id}`);
    }

    getAllSubProducts(id: number) {
        return this.http.get<SubProductListModel>(`${this.API_URL}listall/SubProducts/${id}`);
    }

    create(dadosForm: ProductModel) {
        return this.http.post<ProductModel>(`${this.API_URL}add/`, dadosForm);
    }

    createSubProduct(dadosForm: SubProductModel, id: number) {
        return this.http.post<SubProductModel>(`${this.API_URL}addSubProduct/${id}`, dadosForm);
    }

    addImage(dadosForm: FormData, id: number) {
        return this.http.post(`${this.API_URL}addImages/${id}`, dadosForm);
    }

    update(dadosForm: ProductModel, id: number) {
        return this.http.put<ProductModel>(`${this.API_URL}put/${id}`, dadosForm);
    }

    updateSubProduct(dadosForm: ProductModel, id: number) {
        return this.http.put<ProductModel>(`${this.API_URL}putSubProduct/${id}`, dadosForm);
    }

    updateImages(dadosForm: FormData, id: number) {
        return this.http.put<ProductModel>(`${this.API_URL}putImages/${id}`, dadosForm);
    }

    delete(id: number) {
        return this.http.delete<ProductModel>(`${this.API_URL}del/${id}`);
    }

    deleteSubProduct(id: number) {
        return this.http.delete<ProductModel>(`${this.API_URL}delSubProduct/${id}`);
    }
}
