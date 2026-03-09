import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router= inject(Router)
  return next(req).pipe(catchError((err) =>{
    console.log(err);
    if (err.error.message==="invalid token .. login again") {
      localStorage.removeItem('socialToken');
      router.navigate(['/login'])
    }
    return throwError(()=> err)
  }));

};
