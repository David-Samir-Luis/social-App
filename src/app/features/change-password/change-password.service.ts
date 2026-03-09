import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private readonly httpClient= inject(HttpClient);

  changePassword(body:object){
    return this.httpClient.patch(`${environment.baseUrl}/users/change-password`,body)
  }

}
