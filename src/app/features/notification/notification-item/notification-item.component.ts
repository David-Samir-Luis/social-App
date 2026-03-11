import { Component, inject, Input } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago-pipe';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-item',
  imports: [TimeAgoPipe, AsyncPipe, RouterLink],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css',
})
export class NotificationItemComponent {
  private readonly notificationsService=inject(NotificationsService)
  private readonly router=inject(Router)
  @Input({required:true}) notification!:Inotification;


   markNotificationAsReadItem(notificationId: string){
    //read if Not read
    if (!this.notification.isRead) {
    this.notificationsService.markNotificationAsRead(notificationId).subscribe();
    }

      // navigate to user or post
      if (this.notification.entityType==='post') {
        this.router.navigate(['/details',this.notification.entity._id])
      }else{
        this.router.navigate(['/profile',this.notification.entity._id])
      }
  }

}
