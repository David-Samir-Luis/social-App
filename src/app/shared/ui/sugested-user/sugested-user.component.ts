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

   @Output() functionCall = new EventEmitter<void>();

  followUnfollowUserItem(userId:string):void{
    this.userService.followUnfollowUser(userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.functionCall.emit();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
