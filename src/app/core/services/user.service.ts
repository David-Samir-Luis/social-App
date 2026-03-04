import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    headers:object={
        headers:{
          'AUTHORIZATION':`Bearer ${localStorage.getItem('socialToken')}`
        }
      }
  private readonly httpClient= inject(HttpClient)
  getFollowSuggestionsByLimit(limit:string='4'):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=${limit}`,this.headers)

  }
  followUnfollowUser(userId:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/${userId}/follow`,'',this.headers)

  }

  getFollowSuggestionsByPage(pageNumber:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=10&&page=${pageNumber}`,this.headers)
  }
}
