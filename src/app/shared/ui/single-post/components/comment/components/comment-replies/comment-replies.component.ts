import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { LoadingComponent } from "../../../../../loading/loading.component";
import { RepliesService } from './replies.service';
import { SingleCommentComponent } from "../single-comment/single-comment.component";
import { CreateCommentSectionComponent } from "../create-comment-section/create-comment-section.component";

@Component({
  selector: 'app-comment-replies',
  // forwardRef(() => SingleCommentComponent) to solve Circular Dependency problem.
  imports: [LoadingComponent, forwardRef(() => SingleCommentComponent), CreateCommentSectionComponent],
  templateUrl: './comment-replies.component.html',
  styleUrl: './comment-replies.component.css',
})
export class CommentRepliesComponent implements OnInit {
isLoading:boolean=true;
private readonly repliesService=inject(RepliesService);
@Input({required:true}) postId!:string;
@Input() commentId!:string;
repliesList:Icomment[]=[];
ngOnInit(): void {
  this.getCommentReplies();  
}
  getCommentReplies(){
    this.isLoading=true;
    this.repliesService.getCommentReplies(this.postId,this.commentId).subscribe(
      res=>{
        this.repliesList=res.data.replies;
        this.isLoading=false;
      }
    )
  }

  callBackDeleteComment(commentId:string){
    let index;
        for ( index = 0; index < this.repliesList.length; index++) {
           if (this.repliesList[index]._id===commentId) {
            break;
           }
          
        }
        this.repliesList.splice(index,1)
  }
}
