import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SharePostService } from './share-post.service';

@Component({
  selector: 'app-share-post',
  imports: [ReactiveFormsModule],
  templateUrl: './share-post.component.html',
  styleUrl: './share-post.component.css',
})
export class SharePostComponent {
  private readonly sharePostService=inject(SharePostService)
  @Input({required:true}) post!:Ipost;
  cancelFlag:boolean=false;
  content=new FormControl('');
  cnacelFn():void{
    this.cancelFlag=true;
  }
  submit(postId:string):void{
    const obj:object={"body": this.content.value }
    this.sharePostService.sharePost(postId,obj).subscribe({
      next:res=>{
        console.log(res);
        this.cancelFlag=true;
      },
      error:()=>{
        this.cancelFlag=true;
      }
    })
  }

}
