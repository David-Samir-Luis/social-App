import { Component, inject } from '@angular/core';
import { SugestedUserComponent } from "../../shared/ui/sugested-user/sugested-user.component";
import { forkJoin, map } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-suggestions',
  imports: [SugestedUserComponent, RouterLink],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
   private readonly userService=inject(UserService);
  nextPageNumber:number=1;
  SuggestionList:IsuggestedUser[]=[];
  
  ngOnInit(): void {
   this.getFollowSuggestionsByPageData();
    
  }
  getFollowSuggestionsByPageData(IsReloadAfterFollow:boolean=false):void{
    // for calling after following user 
    this.nextPageNumber=IsReloadAfterFollow? this.nextPageNumber-2:this.nextPageNumber;


    const page1 =this.userService.getFollowSuggestionsByPage(this.nextPageNumber++)
    const page2 =this.userService.getFollowSuggestionsByPage(this.nextPageNumber++)

    forkJoin([page1,page2]).pipe(map(([page1, page2]) => [...(page1.data.suggestions), ...(page2.data.suggestions)])).subscribe({
      next:(res)=>{
        this.SuggestionList=[...this.SuggestionList,...res];
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
