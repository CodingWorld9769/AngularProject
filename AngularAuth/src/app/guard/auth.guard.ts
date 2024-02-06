import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const service = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(NgToastService);

  if (service.isLoggedIn()) {
    console.log('Logged in!');
    //it goes into infinte loop
    //router.navigate(['dashboard']);
    return true;
  } else {
    toastr.error({
      detail: 'Error',
      summary: 'please login first!!',
      duration: 5000,
    });
    router.navigate(['login']);
    return false;
  }
};
