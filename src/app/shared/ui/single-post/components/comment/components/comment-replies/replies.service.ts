import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  private readonly httpClient= inject(HttpClient)

  getCommentReplies(postId:string ,commentId:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`)
  }
  createReply(postId:string ,commentId:string ,body:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies`,body)
  }
}
