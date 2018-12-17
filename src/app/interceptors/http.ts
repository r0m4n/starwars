import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, EMPTY, throwError, of  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class BadInterceptor implements HttpInterceptor {
  private alertService: AlertService;
  constructor(alertService: AlertService) {
    this.alertService = alertService;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          this.alertService.error(error.error.message);
        } else {
          this.alertService.error(`We encountered a ${error.status} error!`);
        }
        return throwError(error);
      })
    );
  }
}
