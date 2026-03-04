import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient)
headers:object={
        headers:{
          'AUTHORIZATION':`Bearer ${localStorage.getItem('socialToken')}`
        }
      }

  getPostComments(postId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments?page=1&limit=10`,this.headers)
  }
  CreateComment(postId:string,body:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments`,body,this.headers)
  }

  deleteComment(postId:string,commentId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`,this.headers)
  }
  updateComment(postId:string,commentId:string,body:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`,body,this.headers)
  }
    likeOnComment(postId:string,commentId:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/comments/${commentId}/like`,'',this.headers)
  }

}
