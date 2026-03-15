import { Subscription } from 'rxjs';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SugestedUserComponent } from "../../shared/ui/sugested-user/sugested-user.component";
import { UserService } from '../../core/services/user.service';
import { RouterLink } from "@angular/router";
import { SearchFriendsInputComponent } from "../../shared/ui/search-friends-input/search-friends-input.component";
import { LoadingComponent } from "../../shared/ui/loading/loading.component";
import { SearchUserPipe } from '../../shared/pipes/search-user-pipe';

@Component({
  selector: 'app-suggestions',
  imports: [SugestedUserComponent,SearchUserPipe, RouterLink, SearchFriendsInputComponent, LoadingComponent],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent implements OnInit{
   private readonly userService=inject(UserService);
   @Input() userId:string='';
  nextPageNumber:number=1;
inputValue:string='';
  searchfriends:string='';
  loading:boolean=true;
  SuggestionList:IsuggestedUser[]|IuserLike[]=[];
  subscription=new Subscription();
  ngOnInit(): void {

    if (this.userId) {
      this.getUseFriendsData()
    } else {
      this.getFollowSuggestionsByPageData(this.inputValue);
    }
  }

  getFollowSuggestionsByPageData(search:string):void{
      this.loading=true;
      if (this.inputValue!==search) {
        this.nextPageNumber=1;
        this.SuggestionList=[];
        this.inputValue=search;
      }
      
      this.subscription.unsubscribe();
      this.subscription=this.userService.getSearchSuggestions(search,20,this.nextPageNumber++).subscribe({

        next:(res)=>{
        this.SuggestionList=[...this.SuggestionList,...res.data.suggestions];
        this.loading=false;
      },
      error:()=>{
        this.loading=false;
      }
      })

}

callBackforFollowUser(userId:string){
  const index =this.SuggestionList.findIndex((item)=>item._id===userId);
  this.SuggestionList.splice(index,1)
}

getUseFriendsData(){
  this.loading=true
  this.userService.getUserProfile(this.userId).subscribe(
    res=>{
      this.SuggestionList=res.data.user.following;      
      this.loading=false;
    }
  )
}

}


