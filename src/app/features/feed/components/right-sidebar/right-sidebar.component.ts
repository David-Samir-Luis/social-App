import { Component, inject, OnInit } from '@angular/core';
import { SugestedUserComponent } from "../../../../shared/ui/sugested-user/sugested-user.component";
import { UserService } from '../../../../core/services/user.service';
import { RouterLink } from "@angular/router";
import { SearchFriendsInputComponent } from "../../../../shared/ui/search-friends-input/search-friends-input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-right-sidebar',
  imports: [SugestedUserComponent, RouterLink, SearchFriendsInputComponent],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css',
})
export class RightSidebarComponent implements OnInit{
  isHidden=true;
  SuggestionList:IsuggestedUser[]=[];
  private readonly userService =inject(UserService);
  inputValue:string='';
  subscription= new Subscription();

  ngOnInit(): void {
     this.getSearchSuggestionsData(this.inputValue);
  }


  showSuggested(){
    this.isHidden=!this.isHidden;
  }

  getSearchSuggestionsData(search:string):void{
    this.inputValue=search;
    this.subscription.unsubscribe();
    this.subscription=this.userService.getSearchSuggestions(search,4,1).subscribe({
      next:(res)=>{
        this.SuggestionList=res.data.suggestions;
      },
    })
  }


}
