import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  API_URL: string = AppSettings.API_ENDPOINT + 'dashboard/';

  constructor(
    private http: HttpClient
  ) { }

  getSellOut(page: number) {
    return this.http.get<any>(`${this.API_URL}getsellout/${page}`);
  }

  getFee(dadosForm: any) {
    return this.http.post<any>(`${this.API_URL}getFee/`, dadosForm);
  }

  getTotalProfit(dadosForm: any) {
    return this.http.post<any>(`${this.API_URL}getTotalProfit/`, dadosForm);
  }

  getTotalSold(dadosForm: any) {
    return this.http.post<any>(`${this.API_URL}getTotalSold/`, dadosForm);
  }

  sendUserCode(dadosForm: any) {
    return this.http.post<any>(`${this.API_URL}sendUserCode/`, dadosForm);
  }
}
