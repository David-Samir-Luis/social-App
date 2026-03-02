import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  
  private readonly httpClient =inject(HttpClient)
  headers:object={
        headers:{
          'AUTHORIZATION':`Bearer ${localStorage.getItem('socialToken')}`
        }
      }


  getAllPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts`,this.headers)
  }

  createPost(body:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/posts`,body,this.headers)
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`,this.headers)
  }

  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}`,this.headers)
  }
}
