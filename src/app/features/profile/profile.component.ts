import { Component, inject, input, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { SinglePostComponent } from "../../shared/ui/single-post/single-post.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../../core/services/user-data.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from "../../shared/ui/loading/loading.component";
import { NavService } from '../../core/uitilites/nav.service';
import { OpenImageFullScreenService } from '../../layouts/main-layout/components/open-image-full-screen/open-image-full-screen.service';

@Component({
  selector: 'app-profile',
  imports: [SinglePostComponent, DecimalPipe, ReactiveFormsModule, DatePipe, LoadingComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent  implements OnInit{

  private readonly userService=inject(UserService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly userDataService=inject(UserDataService);
  readonly openImageFullScreenService = inject(OpenImageFullScreenService);
  
   readonly navService=inject(NavService);
  profile!:IuserProfile|ImyProfile;
  isFollowing:boolean=false;
  coverAndPhotoFile!:File|null;
  coverPrivacy:FormControl=new FormControl('public');
  photoPrivacy:FormControl=new FormControl('public');
  postsCount:number=0;
  postsLoading:boolean=true;
  followLoading:boolean=false;
  openCoverPrivacy=false;
  openPhotoPrivacy=false;
  profileUrl: string | ArrayBuffer | null | undefined=''
  activeTab:'myposts'|'saved'='myposts'
  PostsList:Ipost[]=[];
  myId:string=JSON.parse(localStorage.getItem('socialUser')!)._id;
zoomLevel = new FormControl(1); // Default scale is 1

get transformStyle() {
  const scale = this.zoomLevel.value;
  return `translate(-50%, -50%) scale(${scale})`;
}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params=>{
       const userId:string=  params.get('id')!;
       if (userId===this.myId) {
         this.getMyProfileData();
         this.getMyPostsData();
         this.getUserProfileData(userId);
        this.getUserPostsData(userId)
       }else{
        this.getUserProfileData(userId);
        this.getUserPostsData(userId)
       }
        
      }
    )
   
  }

  getMyProfileData():void{
    this.userService.getMyProfile().subscribe({
      next:(res)=>{
        this.profile=res.data.user;
        this.userDataService.profilePhotoUrl=this.profile.photo;
      },
    })
  }

  getMyPostsData():void{
    this.postsLoading=true;
    this.userService.getUserPosts(this.myId).subscribe({
      next:(res)=>{
        this.PostsList=res.data.posts;
        this.postsCount=this.PostsList.length;
        this.activeTab='myposts';
        this.postsLoading=false;

        
      },
    })
  }
  getbookmarksData():void{
    this.postsLoading=true;
    this.userService.getbookmarks().subscribe({
      next:(res)=>{
        this.PostsList=res.data.bookmarks;
        console.log(this.PostsList.length);
        
        this.activeTab='saved'
        this.postsLoading=false;
      },
    
    })
  }


  // to fetch posts again
  callBackfunction():void{
    if(this.activeTab==='myposts'){
      this.getMyPostsData()
    }else{
      this.getbookmarksData()
    }
  }


  uploadcover(body:object):void{
    this.userService.uploadcoverPhoto(body).subscribe({
      next:(res)=>{
        
      },
      complete:()=>{
        this.getMyProfileData();
      }
    })
  }
  uploadPhoto(body:object):void{
    this.userService.uploadProfilePhoto(body).subscribe({
      next:(res)=>{
        
      },
      complete:()=>{
        this.getMyProfileData();
        if (this.activeTab==='myposts') {
          this.getMyPostsData();
        }
        else{
          this.getbookmarksData();
        }
      }
    })
  }

  readImg(e:Event,imageToRead:'cover'|'photo'):void{ 
    const input=e.target as HTMLInputElement;
    if (input.files && input.files.length>0) {
      this.coverAndPhotoFile=input.files[0];
      input.value = '';
      if (imageToRead==='cover') {
        this.openCoverPrivacy=true;
      }
      else{
        this.openPhotoPrivacy=true;
        

        }

         //file reader
      const filereader = new FileReader();
      filereader.readAsDataURL(this.coverAndPhotoFile);
      filereader.onload=(ev:ProgressEvent<FileReader>)=>{
        this.profileUrl=ev.target?.result
      }

    }
  }
   closeCoverPrivacyWindow():void{
      this.openCoverPrivacy=false;

    }
   closePhotoPrivacyWindow():void{
      this.openPhotoPrivacy=false;

    }

    submitUploadCover():void{
      if (this.coverAndPhotoFile) {
        const formData= new FormData();
        formData.append('cover',this.coverAndPhotoFile);
        formData.append('privacy',this.coverPrivacy.value);
        this.openCoverPrivacy=false;
        this.coverAndPhotoFile=null;
        this.uploadcover(formData);
      }

    }
    submitUploadProfilePhoto():void{
      if (this.coverAndPhotoFile) {
        const formData= new FormData();
        formData.append('photo',this.coverAndPhotoFile);
        formData.append('privacy',this.photoPrivacy.value);
        this.openPhotoPrivacy=false;
        this.coverAndPhotoFile=null;
        this.uploadPhoto(formData);
      }
    }
    removeCover(){
      this.profile.cover='';
      this.userService.removeCoverPhoto().subscribe();
    }

getUserProfileData(userId: string){
  this.userService.getUserProfile(userId).subscribe(
    res=>{
      this.profile=res.data.user;
      this.isFollowing=res.data.isFollowing;
    }
  )
}
getUserPostsData(userId: string){
  this.postsLoading=true;
  this.userService.getUserPosts(userId).subscribe(
    res=>{
      this.PostsList=res.data.posts;
      this.postsCount=this.PostsList.length;
      this.postsLoading=false;
    }
  )
}

followUnfollowUserItem(userId:string):void{
  if (!this.followLoading) {
  this.followLoading=true;
    this.userService.followUnfollowUser(userId).subscribe({
      next:()=>{
        this.followLoading=false;
        this.isFollowing=!this.isFollowing;         
      },
      error:()=>{
        this.followLoading=false;
      }
    })
  }
  }
}
