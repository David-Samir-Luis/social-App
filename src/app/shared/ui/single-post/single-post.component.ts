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
import { ToastrService } from 'ngx-toastr';
import { OpenImageFullScreenService } from '../../../layouts/main-layout/components/open-image-full-screen/open-image-full-screen.service';
import { ShowLikesComponent } from "./components/show-likes/show-likes.component";
import { DeleteAlertComponent } from "../delete-alert/delete-alert.component";

@Component({
  selector: 'app-single-post',
  imports: [ReactiveFormsModule, TimeAgoPipe, AsyncPipe, RouterLink, SharePostComponent, CommentComponent, PostingSharedComponent, ShowLikesComponent, DeleteAlertComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements AfterViewInit{
  @Input({required:true}) post!:Ipost;
  @Output() callParentFunction= new EventEmitter<void>();
   isEdit:boolean=false;
   showLikesFlag:boolean=true;
    postToEditId:string='';
    isSaved:boolean=false;
    showCommentsFlag:boolean=false;
    showDeleteWindowFlag:boolean=false;
    

    loginedUserId: string = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    private readonly postsService = inject(PostsService);
    private readonly tastr = inject(ToastrService);
    readonly openImageFullScreenService = inject(OpenImageFullScreenService);

    editContent:FormControl=new FormControl('');
    editPrivacy:FormControl=new FormControl('');

    ngAfterViewInit(): void {
    setTimeout(() => initFlowbite(), 0);
  }

    deletePostItem():void{
    this.postsService.deletePost(this.post.id).subscribe({
      next:(res)=>{
        if(res.success){
          this.showDeleteWindowFlag=false
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
      // to show react instantly without waiting for response
      const index= post.likes.findIndex((item)=>item===post.user._id)
      if (index>-1) {
        post.likes.splice(index,1);
      }else{
        post.likes.push(post.user._id)        
      }
      post.likesCount=post.likes.length;
      
      
      this.postsService.likeOnPost(post._id).subscribe({
        next:(res)=>{
          post.likes=res.data.post.likes;
          post.likesCount=post.likes.length;
        },
      })
    }
  copyPostLink(postId: string) {
  const url = `${window.location.origin}/#/details/${postId}`;
  navigator.clipboard.writeText(url).then(() => {
    this.tastr.success('Link copied');
  }).catch(err => {
    console.error('Failed to copy', err);
    this.tastr.success('Failed to copy');
  });

  this.closeDropdown(postId);

}


}
