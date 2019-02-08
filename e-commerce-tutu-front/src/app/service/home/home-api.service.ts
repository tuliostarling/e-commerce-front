import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../../app.settings';
import { SubProductModel } from '../../model/product/product';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  API_URL: string = AppSettings.API_ENDPOINT + 'home/';

  constructor(
    private http: HttpClient
  ) { }

  getHomeProducts() {
    return this.http.get<SubProductModel>(`${this.API_URL}getHomeProducts/`);
  }

  addHomeProduct(dadosForm: any) {
    return this.http.post(`${this.API_URL}addHomeProducts/`, dadosForm);
  }

  updatePositionHomeProduct(dadosForm: any) {
    return this.http.post(`${this.API_URL}updatePosition/`, dadosForm);
  }

  deleteHomeProduct(id: number) {
    return this.http.delete<any>(`${this.API_URL}removeHomeProducts/${id}`);
  }

  getHomeImages() {
    return this.http.get<any>(`${this.API_URL}getHomeImages/`);
  }

  addImage(dadosForm: FormData) {
    return this.http.post(`${this.API_URL}addImages/`, dadosForm);
  }

  putImage(dadosForm: FormData) {
    return this.http.put(`${this.API_URL}putImages/`, dadosForm);
  }

  getAllSubProducts() {
    return this.http.get<SubProductModel>(`${this.API_URL}getAllSubProducts/`);
  }
}
