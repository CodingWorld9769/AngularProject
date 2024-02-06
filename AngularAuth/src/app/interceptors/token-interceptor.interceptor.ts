import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { request } from 'http';
import { ToastrModule } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);
  const toast = inject(NgToastService);
  const router = inject(Router);

  const myToken = auth.getToken();
  // console.log(" I'm in interceptore", myToken);
  if (myToken) {
    // console.log(" I'm in interceptore if block", myToken);
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${myToken}` },
    });
  }
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          toast.warning({
            detail: 'warning',
            summary: 'Token is expired, login again',
          });
          router.navigate(['login']);
        }
      }
      return throwError(() => new Error('Some other error occured'));
    })
  );
};
