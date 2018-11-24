import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../../app.settings';
import { SubProductModel } from '../../model/product/product';
import { HomeModel, CarouselImagesModel } from '../../model/home/home';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  API_URL: string = AppSettings.API_ENDPOINT + 'home/';

  constructor(
    private http: HttpClient
  ) { }

  getHomeTypes() {
    return this.http.get<HomeModel>(`${this.API_URL}getHomeTypes/`);
  }

  createCarouselImage(dadosForm: CarouselImagesModel) {
    return this.http.post<CarouselImagesModel>(`${this.API_URL}add/`, dadosForm);
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
