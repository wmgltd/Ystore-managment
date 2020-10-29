import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          // localStorage.removeItem('token');
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          return this.router.navigate(['auth/signup'], { queryParamsHandling: 'preserve' });
        }
        else {
          return throwError(error);
        }
      })) as Observable<HttpEvent<any>>;
  }
}
