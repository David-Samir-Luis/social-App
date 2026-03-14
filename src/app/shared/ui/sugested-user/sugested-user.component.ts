import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sugested-user',
  imports: [RouterLink],
  templateUrl: './sugested-user.component.html',
  styleUrl: './sugested-user.component.css',

})
export class SugestedUserComponent {
  @Input({required:true}) user!:IsuggestedUser|IuserLike;
  @Input() isFollowing:boolean=false;
  @Input() friend:boolean=false;
  private readonly userService=inject(UserService);
followLoading:boolean=false;
   @Output() functionCall = new EventEmitter<string>();

  followUnfollowUserItem(userId:string):void{
   if (!this.followLoading) {
    this.followLoading=true;
     this.userService.followUnfollowUser(userId).subscribe({
      next:()=>{
        this.functionCall.emit(userId);
        this.followLoading=false;
      },
    })
   }
  }



}
