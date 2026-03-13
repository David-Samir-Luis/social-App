import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Dropdown, initFlowbite } from 'flowbite';
import { UserDataService } from '../../../../../../../core/services/user-data.service';
import { TimeAgoPipe } from '../../../../../../pipes/time-ago-pipe';
import { CommentService } from '../../comment.service';
import { CommentRepliesComponent } from "../comment-replies/comment-replies.component";
import { OpenImageFullScreenService } from '../../../../../../../layouts/main-layout/components/open-image-full-screen/open-image-full-screen.service';

@Component({
  selector: 'app-single-comment',
  imports: [RouterLink, ReactiveFormsModule, TimeAgoPipe, AsyncPipe, CommentRepliesComponent],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css',
})
export class SingleCommentComponent implements OnInit{

  
 @Input({required:true}) comment!:Icomment;
 @Input({required:true}) type!:'comment'|'reply';
  @Output() eventEmitter=new EventEmitter<string>();
  readonly userDataService = inject(UserDataService);
  private readonly commentService = inject(CommentService);
  readonly openImageFullScreenService = inject(OpenImageFullScreenService);
  showRepliesFlag:boolean=false;

  editContent:FormControl=new FormControl('',Validators.minLength(2));
  isEdit:boolean=false;
  ngOnInit(): void {
    setTimeout(()=>{initFlowbite()},0)
  } 


editCommentData(comment:Icomment):void{
    this.closeDropdown(comment._id)
      this.editContent.reset(comment.content);
      this.isEdit=true;
      
      
  }

  deletecommentItem(comment:Icomment):void{
  this.closeDropdown(comment._id)
  this.commentService.deleteComment(comment.post,comment._id).subscribe({
    next:(res:any)=>{
      if(res.success){
        this.eventEmitter.emit(comment._id);
      }
    }

  })
  }
   closeDropdown(commentId: string) {
  const $triggerEl = document.querySelector(`#dropdownMenuIconButton${commentId}`);
  const $targetEl = document.querySelector(`#dropdownDots${commentId}`);
  
  if ($triggerEl && $targetEl) {
    const dropdown = new Dropdown($targetEl as HTMLElement, $triggerEl as HTMLElement);
    dropdown.hide();
  }
}

  cancelEdit(): void {
  this.isEdit = false;
  this.editContent.reset('');
}
saveCommentChanges(comment:Icomment){
   if (this.editContent.value) {
      const formDate=new FormData();
      if (this.editContent.value) {
        formDate.append('content',this.editContent.value)
      }

      comment.content=this.editContent.value;

      this.isEdit=false;

      this.commentService.updateComment(comment.post,comment._id,formDate).subscribe({
        next:(res)=>{
          console.log(res);
          
        },
      })
    }
}

likeComment(comment:Icomment):void{
    this.commentService.likeOnComment(comment.post,comment._id).subscribe({
      next:(res)=>{
        comment.likes=res.data.comment.likes;
      },
    })
  }

}
