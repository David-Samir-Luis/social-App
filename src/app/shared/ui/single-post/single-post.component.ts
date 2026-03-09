import { PostsService } from './../../../core/services/posts.service';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, initFlowbite } from 'flowbite';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { SharePostComponent } from "../../../features/feed/components/share-post/share-post.component";
import { CommentComponent } from "./components/comment/comment.component";
import { PostingSharedComponent } from "./components/posting-shared/posting-shared.component";

@Component({
  selector: 'app-single-post',
  imports: [ReactiveFormsModule, TimeAgoPipe, AsyncPipe, RouterLink, SharePostComponent, CommentComponent, PostingSharedComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements AfterViewInit{
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

    ngAfterViewInit(): void {
    setTimeout(() => initFlowbite(), 0);
  }

    deletePostItem(postId:string):void{
      this.closeDropdown(postId)
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        if(res.success){
          
          this.callParentFunction.emit();
        }
      },
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
         
        })
      }
  
    }
    savePost(post:Ipost):void{
      this.closeDropdown(post._id)
     post.bookmarked=!post.bookmarked;
      this.postsService.bookmarkPost(post._id).subscribe({
        next:(res)=>{
          
        },
  
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
          post.likes=res.data.post.likes;
        },
      })
    }
  

}
