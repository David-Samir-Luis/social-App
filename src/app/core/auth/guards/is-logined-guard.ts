import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoginedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  //  login ,  register , forget password
  if (localStorage.getItem('socialToken')) {
    return router.parseUrl('/feed')
  }else{
    return true;
  }
};
