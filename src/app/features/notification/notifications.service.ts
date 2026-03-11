import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient=inject(HttpClient);
  getNotifications():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/notifications?page=1&limit=50`)
  }
  getUnreadCount():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/notifications/unread-count`)
  }
  markNotificationAsRead(notificationId:string):Observable<any>{
    return this.httpClient.patch(`${environment.baseUrl}/notifications/${notificationId}/read`,'')
  }
  markAllNotificationsAsRead():Observable<any>{
    return this.httpClient.patch(`${environment.baseUrl}/notifications/read-all`,'')
  }

}
