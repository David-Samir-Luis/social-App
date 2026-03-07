import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { SugestedUserComponent } from "../../shared/ui/sugested-user/sugested-user.component";
import { UserService } from '../../core/services/user.service';
import { RouterLink } from "@angular/router";
import { SearchFriendsInputComponent } from "../../shared/ui/search-friends-input/search-friends-input.component";

@Component({
  selector: 'app-suggestions',
  imports: [SugestedUserComponent, RouterLink, SearchFriendsInputComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
   private readonly userService=inject(UserService);
  nextPageNumber:number=1;
  inputValue:string='';
  SuggestionList:IsuggestedUser[]=[];
  subscription=new Subscription();
  ngOnInit(): void {
   this.getFollowSuggestionsByPageData(this.inputValue);
    
  }
  getFollowSuggestionsByPageData(search:string):void{
      if (this.inputValue!==search) {
        this.nextPageNumber=1;
        this.SuggestionList=[];
        this.inputValue=search;
      }
      
      this.subscription.unsubscribe();
      this.subscription=this.userService.getSearchSuggestions(search,20,this.nextPageNumber++).subscribe({

        next:(res)=>{
        this.SuggestionList=[...this.SuggestionList,...res.data.suggestions];
      },
      error:(err)=>{
        console.log(err);
        
      }
      })

}

callBackforFollowUser(userId:string){
  const index =this.SuggestionList.findIndex((item)=>item._id===userId);
  this.SuggestionList.splice(index,1)
}

}


