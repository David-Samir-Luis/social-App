import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PostsService } from '../../../../core/services/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-posts-area',
  imports: [ReactiveFormsModule],
  templateUrl: './posts-area.component.html',
  styleUrl: './posts-area.component.css',
})
export class PostsAreaComponent implements OnInit {
  private readonly postsService = inject(PostsService)
  postsList: Ipost[] = [];
  imgFile!:File;
  imgUrl: string | ArrayBuffer | null | undefined=''
  loginedUserId: string = JSON.parse(localStorage.getItem('socialUser')!)?._id;
  content:FormControl=new FormControl('');
  privacy:FormControl=new FormControl('public');
  ngOnInit(): void {
    this.getAllPostsData();
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
  closeImg():void{
    this.imgUrl='';
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


}
