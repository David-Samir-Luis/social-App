import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { LoadingComponent } from "../../../loading/loading.component";
import { CommentService } from './comment.service';
import { CreateCommentSectionComponent } from "./components/create-comment-section/create-comment-section.component";
import { SingleCommentComponent } from "./components/single-comment/single-comment.component";
@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, LoadingComponent, SingleCommentComponent, CreateCommentSectionComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit{
  private readonly commentService = inject(CommentService);
  commentsList:Icomment[]=[];
  @Input()showCommentsFlag!:boolean;
  isLoading:boolean=true;

 @Input({required:true}) postId!:string;

 ngOnInit(): void {
    this.GetPostCommentsData()
 }
  GetPostCommentsData():void{
  this.isLoading=true;
    this.commentService.getPostComments(this.postId).subscribe(
      {
        next:(res)=>{
          this.commentsList=res.data.comments;
          this.commentsList.sort((a,b)=>b.likes.length-a.likes.length);
          this.isLoading=false;

        },
        complete:()=>{
          setTimeout(() => initFlowbite(), 0);
        }
      }
    )
  }


  sortComments(e:Event){
     const value=(e.target as HTMLSelectElement).value;
     if(value==='relevant')
     {
      this.commentsList.sort((a,b)=>b.likes.length-a.likes.length);
     }else{
      this.commentsList.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
     }
  }

  callBackDeleteComment(commentId:string){
    let index;
        for ( index = 0; index < this.commentsList.length; index++) {
           if (this.commentsList[index]._id===commentId) {
            break;
           }
          
        }
        this.commentsList.splice(index,1)
  }

}
