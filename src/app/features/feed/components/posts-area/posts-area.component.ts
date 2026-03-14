import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
export class PostsAreaComponent implements OnInit,AfterViewInit  {
  private readonly postsService = inject(PostsService);
  readonly userDataService = inject(UserDataService);
  readonly userService = inject(UserService);
  readonly activatedRoute = inject(ActivatedRoute);
  isloading:boolean=false;
  tab:string='feed';   // 'feed'|'myPosts'|'community'|'saved'
  postsList: Ipost[] = [];
  loading:boolean=true;
  imgFile!:File|null;
  imgUrl: string | ArrayBuffer | null | undefined='';
   content:FormControl=new FormControl('');
  privacy:FormControl=new FormControl('public');
  pageNumber :number= 1;
  loadingMore :boolean= false;
  finished:boolean = false;
   @ViewChild('scrollTrigger')
  trigger!: ElementRef;
   ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        this.tab=query.get('tab')|| 'feed' ;
        this.loading=true;
        this.pageNumber= 1;
        this.loadingMore = false;
        this.finished = false;
        this.getPosts(this.tab);
      }
    )
  }
   ngAfterViewInit() {
    this.createObserver();
  }

  createObserver() {

    const observer = new IntersectionObserver(
      (entries) => {

        const entry = entries[0];

        if (entry.isIntersecting) {
          this.getPosts(this.tab);
        }

      },
      {
        root: null,
        threshold: 0.1
      }
    );

    observer.observe(this.trigger.nativeElement);
  }


  getPosts(tab:string):void{
    if (this.loadingMore || this.finished) return;
    this.loadingMore=true;
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
    this.postsService.getFeedPosts(this.pageNumber).subscribe({
      next: (res) => {
       if (this.loading) {
        this.loading=false;
        this.postsList = res.data.posts;
        this.pageNumber++;
        }
      else{
        if (res.meta.pagination.currentPage===res.meta.pagination.numberOfPages) {
          this.finished = true;
      } else {
        this.postsList.push(...res.data.posts);
        this.pageNumber++;
      }
      }
       this.loadingMore=false;
      },
      error: () => {
        this.loading=false;
      },
      
    })

  }
  getFeedMyPostsData(): void {
    
    this.postsService.getFeedMyPosts(this.pageNumber).subscribe({
      next: (res) => {
        if (this.loading) {
        this.loading=false;
        this.postsList = res.data.posts;
        this.pageNumber++;
        }
      else{
        if (res.meta.pagination.currentPage===res.meta.pagination.numberOfPages) {
          this.finished = true;
      } else {
        this.postsList.push(...res.data.posts);
        this.pageNumber++;
      }
      }
      this.loadingMore=false;
      },
      error: () => {
        this.loading=false;
      },
    })
  }
  getFeedCommunityPostsData(): void {
    
    this.postsService.getFeedCommunityPosts(this.pageNumber).subscribe({
      next: (res) => {
      if (this.loading) {
        this.loading=false;
        this.postsList = res.data.posts;
        this.pageNumber++;
        }
      else{
        if (res.meta.pagination.currentPage===res.meta.pagination.numberOfPages) {
          this.finished = true;
      } else {
        this.postsList.push(...res.data.posts);
        this.pageNumber++;
      }
      }
      this.loadingMore=false;
      },
      error: () => {
        this.loading=false;
      },
    })
  }
  getbookmarksData(): void {
    
    this.userService.getbookmarks().subscribe({
      next: (res) => {
        this.loading=false;
        this.postsList = res.data.bookmarks;
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
  if (!this.isloading) {
    this.isloading=true;
    this.postsService.createPost(formData).subscribe({
      next:(res)=>{
       if (res.success) {
        // reset Inputs
        this.content.reset('');
        this.imgUrl='';
        this.isloading=false;
        this.getPosts(this.tab);
        
       }
      },
    })
  }
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
