import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { XhrService } from '../services/xhr/xhr.service';
import { LoadingService } from '../services/loading/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string | null = null;

  constructor(
    private http: XhrService,
    private router: Router,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.token = localStorage.getItem('token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token ? this.token : ''}`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=31536000',
      },
    });
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.alertService.error(error.error ? error.error : '!BAD REQUEST!');
          localStorage.removeItem('token');
          return throwError(error);
        } else {
          if (error instanceof HttpErrorResponse) {
            if (
              error.status === 500 ||
              error.status === 502 ||
              error.status === 503
            ) {
              this.alertService.error(
                error.error ? error.error : '!Technical Error!'
              );
            } else if (error.status === 400) {
              this.alertService.error(
                error.error ? error.error : '!BAD REQUEST!'
              );
            } else if (error.status === 404) {
              this.alertService.error(
                error.error
                  ? error.error.errorMessage
                    ? error.error.errorMessage
                    : '!METHOD NOT FOUND!'
                  : '!METHOD NOT FOUND!'
              );
            } else if (error.status === 415) {
              this.alertService.error(
                error.error
                  ? error.error.errorMessage
                    ? error.error.errorMessage
                    : 'Unsupported Media Type'
                  : 'Unsupported Media Type'
              );
            } else {
              this.alertService.error(
                error.error
                  ? error.error.errorMessage
                    ? error.error.errorMessage
                    : '!SYSTEM ERROR!'
                  : '!SYSTEM ERROR!'
              );
            }
          }

          return throwError(error);
        }
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }
}
