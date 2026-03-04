import { Component, inject, OnInit } from '@angular/core';
import { SugestedUserComponent } from "../../../../shared/ui/sugested-user/sugested-user.component";
import { UserService } from '../../../../core/services/user.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-right-sidebar',
  imports: [SugestedUserComponent, RouterLink],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css',
})
export class RightSidebarComponent implements OnInit{
  isHidden=true;
  SuggestionList:IsuggestedUser[]=[];
  private readonly userService =inject(UserService)

  ngOnInit(): void {
     this.getFollowSuggestionsByLimitData();
  }


  showSuggested(){
    this.isHidden=!this.isHidden;
  }

  getFollowSuggestionsByLimitData():void{
    this.userService.getFollowSuggestionsByLimit().subscribe({
      next:(res)=>{
        this.SuggestionList=res.data.suggestions;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
