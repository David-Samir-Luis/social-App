import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Dropdown } from 'flowbite';
import { UserService } from '../../../../core/services/user.service';
import { UserDataService } from '../../../../core/services/user-data.service';
import { UnreadNotificationsCountService } from '../../../../core/services/unread-notifications-count.service';
import { NotificationsService } from '../../../../features/notification/notifications.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit,OnDestroy{
  private readonly authService= inject(AuthService)
  private readonly userService= inject(UserService)
  readonly userDataService= inject(UserDataService)
  readonly UnreadCountService =inject(UnreadNotificationsCountService)
  readonly notificationsService =inject(NotificationsService)
  private readonly router= inject(Router)
  private readonly toastr = inject(ToastrService);
  intervalId:number=0;
  userId:string=JSON.parse(localStorage.getItem('socialUser')!)._id
  profileData!:ImyProfile;
   ngOnInit(): void {
    this.checkTokenExpiration();
    setTimeout(()=>{initFlowbite()},0)
     this.getProfileData();
     this.getUnreadCountData()
     this.intervalId=setInterval(() => this.getUnreadCountData(), 5000)
    
  }
  logOut():void{
    this.authService.singOut();
  }

    getProfileData():void{
    this.userService.getMyProfile().subscribe({
      next:(res)=>{
        this.profileData=res.data.user;
        this.userDataService.profilePhotoUrl=this.profileData.photo;
        this.userDataService.name=this.profileData.name;
        this.userDataService._id=this.profileData._id;

      },
     
    
    })
  }
    closeDropdown() {
    const $triggerEl = document.querySelector(`#user-menu-button`);
    const $targetEl = document.querySelector(`#user-dropdown`);
    
    if ($triggerEl && $targetEl) {
      const dropdown = new Dropdown($targetEl as HTMLElement, $triggerEl as HTMLElement);
      dropdown.hide();
    }
  }
  
  getUnreadCountData(){
    this.notificationsService.getUnreadCount().subscribe(
      res=>{
        this.UnreadCountService.updatedUnreadCount=res.data.unreadCount;
      }
    )
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  checkTokenExpiration():void{
    if (localStorage.getItem('loginTime')) {
      const loginTime=localStorage.getItem('loginTime');
      const now=Date.now();
      const sevenDays:number=604800000;// 1000 * 60 * 60 * 24 * 7

    if (now - Number(loginTime)> sevenDays) {
      localStorage.removeItem('socialToken');
      this.router.navigate(['/login']);
      this.toastr.info('Login time expired please login again');
    }
}
else{
  localStorage.removeItem('socialToken');
  this.toastr.info('Login time expired please login again');
  this.router.navigate(['/login']);
}

  }
  
}
