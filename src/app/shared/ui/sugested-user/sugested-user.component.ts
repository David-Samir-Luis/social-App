import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-sugested-user',
  imports: [],
  templateUrl: './sugested-user.component.html',
  styleUrl: './sugested-user.component.css',
})
export class SugestedUserComponent {
  @Input({required:true}) user!:IsuggestedUser;
  private readonly userService=inject(UserService);

   @Output() functionCall = new EventEmitter<string>();

  followUnfollowUserItem(userId:string):void{
    this.userService.followUnfollowUser(userId).subscribe({
      next:(res)=>{
        this.functionCall.emit(userId);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
