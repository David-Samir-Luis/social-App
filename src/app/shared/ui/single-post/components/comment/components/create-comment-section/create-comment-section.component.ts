import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserDataService } from '../../../../../../../core/services/user-data.service';
import { CommentService } from '../../comment.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepliesService } from '../comment-replies/replies.service';

@Component({
  selector: 'app-create-comment-section',
  imports: [ReactiveFormsModule],
  templateUrl: './create-comment-section.component.html',
  styleUrl: './create-comment-section.component.css',
})
export class CreateCommentSectionComponent {
    imgFile!:File|null;
    isloading:boolean=false;
  imgUrl: string | ArrayBuffer | null | undefined=''
  readonly userDataService = inject(UserDataService);
    private readonly commentService = inject(CommentService);
    private readonly repliesService = inject(RepliesService);
  content:FormControl=new FormControl('',Validators.minLength(2));
  @Output() callParentFunction=new EventEmitter<void>();
  @Input({required:true}) postId!:string;
  @Input({required:false}) commentId!:string;
  @Input({required:true}) type!:'reply'|'comment';
   closeImg():void{
    this.imgUrl='';
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
      
      if (this.type==='comment') {
        this.createCommentInView(formDate)
      } else {
        this.createReplyInView(formDate);
      }
        

    }
    
   }
    
    
  }


  createCommentInView(formData:FormData):void{
   if (this.isloading===false) {
    this.isloading=true;
     this.commentService.CreateComment(this.postId,formData).subscribe({
      next:(res)=>{
      if (res.success) {
        // reset Inputs
        this.content.reset('');
        this.imgUrl='';
        this.isloading=false;
     this.callParentFunction.emit();
        
      }
      },
    })
   }
  }
  createReplyInView(formData:FormData):void{
    if (this.isloading===false) {
    this.isloading=true;
    this.repliesService.createReply(this.postId,this.commentId,formData).subscribe({
      next:(res)=>{
      if (res.success) {
        // reset Inputs
        this.content.reset('');
        this.imgUrl='';
         this.isloading=false;
        this.callParentFunction.emit();
        
      }
      },
    })
  }

}
}
