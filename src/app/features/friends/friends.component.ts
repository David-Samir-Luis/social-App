import { Component, inject, OnInit } from '@angular/core';
import { SuggestionsComponent } from "../suggestions/suggestions.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  imports: [SuggestionsComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent implements OnInit{

  private readonly activatedRoute=inject(ActivatedRoute)
  userId:string='';
  ngOnInit(): void {
    console.log(12);
    
    this.activatedRoute.paramMap.subscribe(
      query=>{
        this.userId=query.get('id')||'';        
      }
    )
  }

}
