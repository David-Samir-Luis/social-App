import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnreadNotificationsCountService {
  updatedUnreadCount:number=0;
}
