import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PostsService } from '../../../../core/services/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Dropdown } from 'flowbite';
import { CommentComponent } from "./comment/comment.component";

@Component({
  selector: 'app-posts-area',
  imports: [ReactiveFormsModule, CommentComponent],
  templateUrl: './posts-area.component.html',
  styleUrl: './posts-area.component.css',
})
export class PostsAreaComponent implements OnInit {
  private readonly postsService = inject(PostsService)
  postsList: Ipost[] = [];
  imgFile!:File|null;
  imgUrl: string | ArrayBuffer | null | undefined=''
  isEdit:boolean=false;
  postToEditId:string='';
  isSaved:boolean=false;
  showCommentsFlag:boolean=false;
  loginedUserId: string = JSON.parse(localStorage.getItem('socialUser')!)?._id;
  content:FormControl=new FormControl('');
  privacy:FormControl=new FormControl('public');
  editContent:FormControl=new FormControl('');
  editPrivacy:FormControl=new FormControl('');
  ngOnInit(): void {
    this.getAllPostsData();
  }

   closeImg():void{
    this.imgUrl='';
  }
  getAllPostsData(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.postsList = res.data.posts;

      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        
        setTimeout(() => initFlowbite(), 0);
      }
    })

  }

  readImg(event:Event){
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
    }

  }
 

  submitForm(e:Event):void{
    e.preventDefault();

    if (this.content.value || this.imgFile) {

      const formDate=new FormData();
      if (this.content.value) {
        formDate.append('body',this.content.value)
      }
      formDate.append('privacy',this.privacy.value)
      if (this.imgFile) {
        formDate.append('image',this.imgFile)
      }
    
      this.imgFile=null;
      this.createPostInView(formDate)
        

    }
    
    
  }

  createPostInView(formData:FormData):void{
   

    this.postsService.createPost(formData).subscribe({
      next:(res)=>{
       if (res.success) {
        // reset Inputs
        this.content.reset('');
        this.imgUrl='';
        this.getAllPostsData();
        
       }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  deletePostItem(postId:string):void{
    this.closeDropdown(postId)
  this.postsService.deletePost(postId).subscribe({
    next:(res)=>{
      if(res.success){
        
        this.getAllPostsData()
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

     const editPost=this.postsList.find((item)=>item._id===post._id) as Ipost
      editPost.body=this.editContent.value;
      editPost.privacy=this.editPrivacy.value;

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
