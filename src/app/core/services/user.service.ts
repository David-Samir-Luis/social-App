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
  // getFollowSuggestions(pageNumber:number,limit:number):Observable<any>{
  //   return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=${limit}&&page=${pageNumber}`,this.headers)

  // }


  followUnfollowUser(userId:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/${userId}/follow`,'',this.headers)

  }


  getMyProfile():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`,this.headers)
  }
  uploadProfilePhoto(body:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`,body,this.headers)
  }
  uploadcoverPhoto(body:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-cover`,body,this.headers)
  }
  removeCoverPhoto():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/users/cover`,this.headers)
  }
  getbookmarks():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks`,this.headers)
  }
  getUserPosts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`,this.headers)
  }
  getSearchSuggestions(search:string,limit:number,pageNumber:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users//suggestions?page=${pageNumber}&limit=${limit}&q=${search}`,this.headers)
  }

}
