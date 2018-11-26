import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorError implements HttpInterceptor {

    constructor(
        private toastrService: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse, caught) => {
            switch (err.status) {
                case 401:
                    this.toastrService.error(err.error.error, 'Erro!');
                    break;
                case 404:
                    this.toastrService.error(err.error.error, 'Erro!');
                    break;
                case 500:
                    this.toastrService.error(err.error.error, 'Erro!');
                    break;
                default:
                    break;
            }

            return observableThrowError(err);
        })) as any;
    }
}
