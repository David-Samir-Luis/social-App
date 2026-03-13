import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router= inject(Router)
  const toastr = inject(ToastrService);
  return next(req).pipe(catchError((err) =>{
    console.log(err);
    
    if (err.error.message==="invalid token .. login again") {
      localStorage.removeItem('socialToken');
      router.navigate(['/login']);
      toastr.info('password changed ,Login again');
    }
    return throwError(()=> err)
  }));

};
