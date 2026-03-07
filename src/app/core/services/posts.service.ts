import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  
  private readonly httpClient =inject(HttpClient)
 


  getAllPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts`)
  }

  createPost(body:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/posts`,body)
  }

  getSinglePost(postId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`)
  }

  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}`)
  }
  updatePost(postId:string,body:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}`,body)
  }

  bookmarkPost(postId:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/bookmark`,'')
  }
  likeOnPost(postId:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/like`,'')
  }

  
}
