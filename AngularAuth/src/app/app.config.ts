import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { authGuard } from './guard/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    AuthService,
    [authGuard],
  ],
};
