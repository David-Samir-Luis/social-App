import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NotificationsService } from './notifications.service';
import { UnreadNotificationsCountService } from '../../core/services/unread-notifications-count.service';
import { LoadingComponent } from "../../shared/ui/loading/loading.component";


@Component({
  selector: 'app-notification',
  imports: [NotificationItemComponent, LoadingComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit ,OnDestroy{
readonly notificationsService =inject(NotificationsService)
readonly unreadNotificationsCountService =inject(UnreadNotificationsCountService)

 notificationsList!:Inotification[];
 loading:boolean=true;
 filteredList!:Inotification[];
 activeTab:'all'|'unread'='all';
 setIntervalId:number=0;
 ngOnInit(): void {
    this.getNotifications();
    this.setIntervalId=setInterval(()=>this.getNotifications(),5000)
 }
 getNotifications(){
  this.notificationsService.getNotifications().subscribe(
    res=>{
      this.notificationsList=res.data.notifications;
      this.updatedFilteredList();  
      this.loading=false;    
    }
  );
 }
  showNotifications(active:'all'|'unread'){
    this.activeTab=active;
    this.updatedFilteredList();
  }


 markAllNotificationsAsReadItem(){
    this.notificationsService.markAllNotificationsAsRead().subscribe(
      res=>{
        this.notificationsList.forEach(item=> item.isRead=true);
        this.updatedFilteredList();        
      }
    )
  }

  updatedFilteredList(){
    if (this.activeTab==='all') {
      this.filteredList=this.notificationsList;
    }
    else{
    this.filteredList=this.notificationsList.filter((item)=>item.isRead===false)

    }
  }


  ngOnDestroy(): void {
    clearInterval(this.setIntervalId);
  }
}
