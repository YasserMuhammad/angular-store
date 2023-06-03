import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginTypeEnum } from '../../enums/login-type.enum';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  let loginType = localStorage.getItem('userType');

  if (loginType && loginType == LoginTypeEnum.ADMIN) return true;
  let token = localStorage.getItem('token');
  if (token) {
    router.navigate(['/store/products']);
  } else {
    router.navigate(['/auth/login']);
  }
  return false;
};
