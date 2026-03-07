import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Dropdown } from 'flowbite';
import { UserService } from '../../../../core/services/user.service';
import { UserDataService } from '../../../../core/services/user-data.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  private readonly authService= inject(AuthService)
  private readonly userService= inject(UserService)
  readonly userDataService= inject(UserDataService)
  profileData!:ImyProfile;
   ngOnInit(): void {
    initFlowbite();
     this.getProfileData();
    
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
  

}
