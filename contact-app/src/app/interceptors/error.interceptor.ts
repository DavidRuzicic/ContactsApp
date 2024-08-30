import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private toastr = inject(ToastrService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400 && error.error.errors) {
                    for (const field in error.error.errors) {
                        if (error.error.errors.hasOwnProperty(field)) {
                            error.error.errors[field].forEach((message: string) => {
                                this.toastr.error(message);
                            });
                        }
                    }
                } else {
                    this.toastr.error('An unexpected error occurred.');
                }
                return throwError(error);
            })
        );
    }
}
