import { Component, inject, Input, input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { initFlowbite } from 'flowbite';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dropdown } from 'flowbite';
@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  private readonly commentService = inject(CommentService)
  commentsList:Icomment[]=[];
  imgFile!:File|null;
  @Input()showCommentsFlag!:boolean;
  imgUrl: string | ArrayBuffer | null | undefined=''
  content:FormControl=new FormControl('',Validators.minLength(2));
  editContent:FormControl=new FormControl('',Validators.minLength(2));
  isEdit:boolean=false;
  commentToEditId:string='';
 @Input({required:true}) postId!:string;

 ngOnInit(): void {
    this.GetPostCommentsData()
 }
 closeDropdown(commentId: string) {
  const $triggerEl = document.querySelector(`#dropdownMenuIconButton${commentId}`);
  const $targetEl = document.querySelector(`#dropdownDots${commentId}`);
  
  if ($triggerEl && $targetEl) {
    const dropdown = new Dropdown($targetEl as HTMLElement, $triggerEl as HTMLElement);
    dropdown.hide();
  }
}
 closeImg():void{
    this.imgUrl='';
  }
  GetPostCommentsData():void{
    this.commentService.getPostComments(this.postId).subscribe(
      {
        next:(res)=>{
          this.commentsList=res.data.comments;
        },
        error:(err)=>{
          console.log(err);
          
        },
        complete:()=>{
          setTimeout(() => initFlowbite(), 0);
        }
      }
    )
  }

   readCommentImg(event:Event){
    const input=event.target as HTMLInputElement
    if (input.files && input.files.length>0) {
      this.imgFile=input.files[0];
      
      //file reader
      const filereader = new FileReader();
      filereader.readAsDataURL(this.imgFile);
      filereader.onload=(ev:ProgressEvent<FileReader>)=>{
        this.imgUrl=ev.target?.result
        
      }
      // reset to detect change if user chose the same picture after close
      input.value = '';
      console.log(input.files[0]);
      
    }

  }
 

  submitForm(e:Event):void{
    e.preventDefault();

   if (this.content.valid) {
     if (this.content.value || this.imgFile) {

      const formDate=new FormData();
      if (this.content.value) {
        formDate.append('content',this.content.value)
      }
      if (this.imgFile) {
        formDate.append('image',this.imgFile)
      }
    
      this.imgFile=null;
      this.createCommentInView(formDate)
        

    }
    
   }
    
    
  }


  createCommentInView(formData:FormData):void{
   

    this.commentService.CreateComment(this.postId,formData).subscribe({
      next:(res)=>{
       if (res.success) {
        // reset Inputs
        this.content.reset('');
        this.imgUrl='';
       this.GetPostCommentsData();
        
       }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  deletecommentItem(commentId:string):void{
  this.closeDropdown(commentId)
  this.commentService.deleteComment(this.postId,commentId).subscribe({
    next:(res)=>{
      if(res.success){
        let index;
        for ( index = 0; index < this.commentsList.length; index++) {
           if (this.commentsList[index]._id===commentId) {
            break;
           }
          
        }
        this.commentsList.splice(index,1)
      }
    },
    error:(err)=>{
      console.log(err);
    }

  })
  }
  editCommentData(comment:Icomment):void{
    this.closeDropdown(comment._id)
      this.editContent.reset(comment.content);
      this.commentToEditId=comment._id;
      this.isEdit=true;
      
      
  }

  cancelEdit(): void {
  this.isEdit = false;
  this.commentToEditId = '';
  this.editContent.reset('');
}
saveCommentChanges(comment:Icomment){
   if (this.editContent.value) {
      const formDate=new FormData();
      if (this.editContent.value) {
        formDate.append('content',this.editContent.value)
      }

     const editcomment=this.commentsList.find((item)=>item._id===comment._id) as Icomment
      editcomment.content=this.editContent.value;

      this.isEdit=false;

      this.commentService.updateComment(this.postId,comment._id,formDate).subscribe({
        next:(res)=>{
          console.log(res);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
}
likeComment(comment:Icomment):void{
   comment.likes
    this.commentService.likeOnComment(this.postId,comment._id).subscribe({
      next:(res)=>{
        comment.likes=res.data.comment.likes;
      },
      error:(err)=>{
        console.log(err);
      }

    })
  }
}
