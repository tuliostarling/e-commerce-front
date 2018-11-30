import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthService {
    private tokenData: any;

    getToken() {
        return localStorage.getItem('token');
    }

    getTokenData() {
        if (this.tokenData == null) {
            const token = localStorage.getItem('token');
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const jsonObj: any = JSON.parse(atob(base64));
            this.tokenData = <any>jsonObj;
        }

        return this.tokenData;
    }
}
