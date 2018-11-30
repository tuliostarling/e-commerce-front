import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorError implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private toastrService: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.tokenInterceptor(req);

        return next.handle(req).pipe(catchError((err: HttpErrorResponse, caught) => {
            const errorMsg = err.error.error;

            switch (err.status) {
                case 401:
                    this.toastrService.error(errorMsg, 'Erro!');
                    break;
                case 404:
                    this.toastrService.error(errorMsg, 'Erro!');
                    break;
                case 500:
                    this.toastrService.error(errorMsg, 'Erro!');
                    break;
                default:
                    break;
            }

            return observableThrowError(err);
        })) as any;
    }

    tokenInterceptor(req) {
        const token = this.authService.getToken();

        let insertToken = true;

        insertToken = !(req.url.indexOf('authenticate') !== -1);

        if (token && insertToken) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (req.url.indexOf('upload') !== -1) {
            req = req.clone({ headers: req.headers.append('enctype', 'multipart/form-data') });
        } else {
            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.append('Content-Type', 'application/json') });
            }
        }
    }
}
