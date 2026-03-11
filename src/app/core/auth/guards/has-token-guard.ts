import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasTokenGuard: CanActivateFn = (route, state) => {
   const router =inject(Router);
  //  feed , profile , notification  , change password
  if (localStorage.getItem('socialToken')) {
    return true;
  }
  else{
    return router.parseUrl('/login')
  }
};


