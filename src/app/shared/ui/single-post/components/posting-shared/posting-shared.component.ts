import { Component, Input, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-posting-shared',
  imports: [RouterLink],
  templateUrl: './posting-shared.component.html',
  styleUrl: './posting-shared.component.css',
})
export class PostingSharedComponent {
  @Input({required:true}) sharedPost!:Ipost;

}
