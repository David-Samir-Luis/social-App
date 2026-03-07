import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

   
  private readonly httpClient= inject(HttpClient)


  followUnfollowUser(userId:string):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/${userId}/follow`,'')

  }


  getMyProfile():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`)
  }
  uploadProfilePhoto(body:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`,body)
  }
  uploadcoverPhoto(body:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-cover`,body)
  }
  removeCoverPhoto():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/users/cover`)
  }
  getbookmarks():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks`)
  }
  getUserPosts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`)
  }
  getSearchSuggestions(search:string,limit:number,pageNumber:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users//suggestions?page=${pageNumber}&limit=${limit}&q=${search}`)
  }

}
