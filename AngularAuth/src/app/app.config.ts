import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { tokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptorInterceptor])), // angular 17 new sytax to provide interceptor
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useFactory: tokenInterceptorInterceptor,
    //   multi: true,
    // },
    NgToastService,
  ],
};
