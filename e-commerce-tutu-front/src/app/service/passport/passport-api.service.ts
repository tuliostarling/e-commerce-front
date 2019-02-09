import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../../app.settings';

@Injectable({
    providedIn: 'root'
})
export class PassportService {

    API_URL: string = AppSettings.API_ENDPOINT + 'passport/auth/';

    constructor(
        private http: HttpClient
    ) { }

    getGoogleLogin() {
        return this.http.get<any>(`${this.API_URL}google/`);
    }

    // getListOne(id: number) {
    //     return this.http.post<any>(`${this.API_URL}listone/`);
    // }
}
