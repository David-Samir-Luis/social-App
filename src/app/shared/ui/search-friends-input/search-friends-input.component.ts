import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-friends-input',
  imports: [],
  templateUrl: './search-friends-input.component.html',
  styleUrl: './search-friends-input.component.css',
})
export class SearchFriendsInputComponent {
  @Output() suggestedList=new EventEmitter<string>();
  subscription= new Subscription();
  getSearchSuggestionsData(e:Event):void{
    const input=e.target as HTMLInputElement;
    this.suggestedList.emit(input.value);
  }


}
