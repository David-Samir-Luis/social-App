import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-like',
  imports: [RouterLink],
  templateUrl: './user-like.component.html',
  styleUrl: './user-like.component.css',
})
export class UserLikeComponent {
  @Input({required:true}) user!:IuserLike;
}
