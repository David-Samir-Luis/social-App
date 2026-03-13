import { Component, EventEmitter, inject, Input, OnInit,  Output } from '@angular/core';
import { UserLikeComponent } from "./user-like/user-like.component";
import { PostsService } from '../../../../../core/services/posts.service';
import { LoadingComponent } from "../../../loading/loading.component";

@Component({
  selector: 'app-show-likes',
  imports: [UserLikeComponent, LoadingComponent],
  templateUrl: './show-likes.component.html',
  styleUrl: './show-likes.component.css',
})
export class ShowLikesComponent implements OnInit {
  @Input({required:true}) postId!:string;
  @Output() callCloseWindow=new EventEmitter<boolean>();
  isLoading:boolean=false;
  private readonly postsService = inject(PostsService);
  postLikesList!:IuserLike[];
    ngOnInit(): void {
      this.getPostLikesData();
    }

getPostLikesData(){
  if (!this.isLoading) {
    this.isLoading=true
  this.postsService.getPostLikes(this.postId).subscribe(
    res=>{
      this.postLikesList=res.data.likes;
      console.log(res);
      this.isLoading=false;
    }
  )
  }
}

  closeWindow():void{
    this.callCloseWindow.emit(false)
  }
}
