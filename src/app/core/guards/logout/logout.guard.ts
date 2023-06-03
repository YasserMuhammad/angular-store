import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

export const logoutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (!localStorage.getItem('token')) return true;
  const router = new Router();
  router.navigate(['/store/products']);
  return false;
};
