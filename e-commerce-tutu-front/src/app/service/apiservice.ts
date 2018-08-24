import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AppSettings } from '../app.settings';
import { UserLoginModel } from '../model/user/userLogin';

@Injectable()
export class ApiService {

    API_URL: string = AppSettings.API_ENDPOINT + 'user/';
    API_AUTH_URL: string = AppSettings.API_ENDPOINT + 'auth/';

    constructor(
        private http: HttpClient
    ) { }

    postUser(dadosForm: UserLoginModel) {
        return this.http.post<UserLoginModel>(this.API_AUTH_URL + 'authlogin/', dadosForm);
    }
}