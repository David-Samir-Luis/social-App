import { PostsService } from './../../../core/services/posts.service';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, initFlowbite } from 'flowbite';
import { CommentComponent } from "../../../features/feed/components/posts-area/comment/comment.component";
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-single-post',
  imports: [CommentComponent,ReactiveFormsModule, TimeAgoPipe,AsyncPipe],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit{
  @Input({required:true}) post!:Ipost;
  @Output() callParentFunction= new EventEmitter<void>();
   isEdit:boolean=false;
    postToEditId:string='';
    isSaved:boolean=false;
    showCommentsFlag:boolean=false;
    loginedUserId: string = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    private readonly postsService = inject(PostsService);
   
    editContent:FormControl=new FormControl('');
    editPrivacy:FormControl=new FormControl('');
    ngOnInit(): void {
      initFlowbite()
    }
    deletePostItem(postId:string):void{
      this.closeDropdown(postId)
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        if(res.success){
          
          this.callParentFunction.emit();
        }
      },
      error:(err)=>{
        console.log(err);
      }
  
    })
    }
  
    editPostData(post:Ipost):void{
      this.closeDropdown(post._id)
      this.editContent.reset(post.body);
      this.editPrivacy.reset(post.privacy);
      this.postToEditId=post._id;
      this.isEdit=true;
  
    }
    cancelEdit():void{
      this.isEdit=false;
    }
    saveChanges(post:Ipost):void{
      if (this.editContent.value) {
        const formDate=new FormData();
        if (this.editContent.value) {
          formDate.append('body',this.editContent.value)
        }
        formDate.append('privacy',this.editPrivacy.value)
        post.body=this.editContent.value;
        post.privacy=this.editPrivacy.value;
  
        this.isEdit=false;
        this.postsService.updatePost(post._id,formDate).subscribe({
          next:(res)=>{
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
  
    }
    savePost(post:Ipost):void{
      this.closeDropdown(post._id)
     post.bookmarked=!post.bookmarked;
      this.postsService.bookmarkPost(post._id).subscribe({
        next:(res)=>{
          
        },
        error:(err)=>{
          console.log(err);
           post.bookmarked=!post.bookmarked;
        }
  
      })
    }
   
  closeDropdown(postId: string) {
    const $triggerEl = document.querySelector(`#dropdownMenuIconButton${postId}`);
    const $targetEl = document.querySelector(`#dropdownDots${postId}`);
    
    if ($triggerEl && $targetEl) {
      const dropdown = new Dropdown($targetEl as HTMLElement, $triggerEl as HTMLElement);
      dropdown.hide();
    }
  }
  
    updateshowcommentsFlag(){
      this.showCommentsFlag=!this.showCommentsFlag
    }
  
    likePost(post:Ipost){
      this.postsService.likeOnPost(post._id).subscribe({
        next:(res)=>{
          console.log(res);
          post.likes=res.data.post.likes;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  

}
