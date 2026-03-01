import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient =inject(HttpClient);
  private readonly router =inject(Router);

  signUp(body:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/users/signup`,body)
  }
  signIn(body:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/users/signin`,body)
  }
  singOut():void{
    localStorage.removeItem('socialToken')
    this.router.navigate(['/login'])
  }
}
