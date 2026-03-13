import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../core/services/posts.service';
import { UserDataService } from '../../../../core/services/user-data.service';
import { UserService } from '../../../../core/services/user.service';
import { LoadingComponent } from "../../../../shared/ui/loading/loading.component";
import { SinglePostComponent } from "../../../../shared/ui/single-post/single-post.component";
@Component({
  selector: 'app-posts-area',
  imports: [ReactiveFormsModule, SinglePostComponent, LoadingComponent],
  templateUrl: './posts-area.component.html',
  styleUrl: './posts-area.component.css',
})
export class PostsAreaComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  readonly userDataService = inject(UserDataService);
  readonly userService = inject(UserService);
  readonly activatedRoute = inject(ActivatedRoute);
  tab:string='feed';   // 'feed'|'myPosts'|'community'|'saved'
  postsList: Ipost[] = [];
  loading:boolean=true;
  imgFile!:File|null;
  imgUrl: string | ArrayBuffer | null | undefined='';

   content:FormControl=new FormControl('');
  privacy:FormControl=new FormControl('public');

   ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        this.tab=query.get('tab')|| 'feed' ;
        this.getPosts(this.tab);
      }
    )
  }

  getPosts(tab:string):void{
    switch (tab) {
      case 'feed':
        this.getFeedPostsData()
        break;
      case 'myPosts':
        this.getFeedMyPostsData()
        break;
      case 'community':
        this.getFeedCommunityPostsData()
        break;
      case 'saved':
        this.getbookmarksData()
        break;
    
      default:
        break;
    }
  }
  getFeedPostsData(): void {
    this.loading=true;
    this.postsService.getFeedPosts().subscribe({
      next: (res) => {
        if(this.tab==='feed'){
          this.loading=false;
        this.postsList = res.data.posts;
        }

      },
      error: () => {
        this.loading=false;
      },
      
    })

  }
  getFeedMyPostsData(): void {
    this.loading=true;
    this.postsService.getFeedMyPosts().subscribe({
      next: (res) => {
        if(this.tab==='myPosts'){
          this.loading=false;
        this.postsList = res.data.posts;
        }
      },
      error: () => {
        this.loading=false;
      },
    })
  }
  getFeedCommunityPostsData(): void {
    this.loading=true;
    this.postsService.getFeedCommunityPosts().subscribe({
      next: (res) => {
        if(this.tab==='community'){
          this.loading=false;
        this.postsList = res.data.posts;
        }
      },
      error: () => {
        this.loading=false;
      },
    })
  }
  getbookmarksData(): void {
    this.loading=true;
    this.userService.getbookmarks().subscribe({
      next: (res) => {
        if(this.tab==='saved'){
          this.loading=false;
          
        this.postsList = res.data.bookmarks;
        }
      },
      error: () => {
        this.loading=false;
      },
    })
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
        this.getPosts(this.tab);
        
       }
      },
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


  
}
