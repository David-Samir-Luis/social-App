import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharePostService {
    private readonly httpClient=inject(HttpClient)
    sharePost(postId:string, body:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/share`,body);
  }
}
