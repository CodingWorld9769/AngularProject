import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { request } from 'http';
import { ToastrModule } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { tokenApiModel } from '../models/token-api.model';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);
  const toast = inject(NgToastService);
  const router = inject(Router);

  const myToken = auth.getToken() as string;
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
          //whenever we get this error I need to send a request to a backend for refreshiong the accesstoken
          // toast.warning({
          //   detail: 'warning',
          //   summary: 'Token is expired, login again',
          // });
          //handle request
          return handleUnAuthorizedError(req, next);
          //  router.navigate(['login']);
        }
      }
      return throwError(() => new Error('Some other error occured'));
    })
  );
};
function handleUnAuthorizedError(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> {
  const auth = inject(AuthService);
  const toast = inject(NgToastService);
  const router = inject(Router);

  const tokenApi = new tokenApiModel();

  const accessToken = auth.getToken();
  const refreshToken = auth.getrefreshToken();

  if (accessToken !== null && refreshToken !== null) {
    tokenApi.accessToken = accessToken;
    tokenApi.refreshToken = refreshToken;
    return auth.renewToken(tokenApi).pipe(
      switchMap((data: tokenApiModel) => {
        auth.storeRefreshToken(data.refreshToken);
        auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` },
        });
        return next(req);
      }),
      catchError((err) => {
        return throwError(() => {
          toast.warning({
            detail: 'warning',
            summary: 'Token is expired, login again',
          });

          //handle request
          router.navigate(['login']);
        });
      })
    );
  } else {
    // Handle the case where either accessToken or refreshToken is null
    throw new Error('Access token or refresh token is null');
  }
}
