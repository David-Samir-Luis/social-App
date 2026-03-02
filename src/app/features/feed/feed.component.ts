import { Component } from '@angular/core';
import { LeftSideBarComponent } from "./components/left-side-bar/left-side-bar.component";
import { RightSidebarComponent } from "./components/right-sidebar/right-sidebar.component";
import { PostsAreaComponent } from "./components/posts-area/posts-area.component";

@Component({
  selector: 'app-feed',
  imports: [LeftSideBarComponent, RightSidebarComponent, PostsAreaComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {

}
