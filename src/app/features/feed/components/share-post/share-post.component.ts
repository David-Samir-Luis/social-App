import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SharePostService } from './share-post.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-share-post',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.css',
})
export class SharePostComponent {
  private readonly sharePostService=inject(SharePostService);
  private readonly toastr = inject(ToastrService);
  @Output() callParentFunction= new EventEmitter<void>();
  @Input({required:true}) post!:Ipost;
  cancelFlag:boolean=false;
  content=new FormControl('');
  cnacelFn():void{
    this.cancelFlag=true;
  }
  submit(postId:string):void{
    const obj:object={"body": this.content.value|| ' ' }
    this.sharePostService.sharePost(postId,obj).subscribe({
      next:res=>{
        this.toastr.success(res.message);
        this.cancelFlag=true;
        this.callParentFunction.emit();
      },
      error:(err)=>{
        this.toastr.info(err.error.message);
        this.cancelFlag=true;
      }
    })
  }

}
