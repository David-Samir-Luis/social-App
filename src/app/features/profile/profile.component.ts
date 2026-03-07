import { Component, inject, input, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { SinglePostComponent } from "../../shared/ui/single-post/single-post.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-profile',
  imports: [SinglePostComponent,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent  implements OnInit{

  private readonly userService=inject(UserService);
  private readonly userDataService=inject(UserDataService);
  myProfile!:ImyProfile;
  coverAndPhotoFile!:File|null;
  coverPrivacy:FormControl=new FormControl('public');
  photoPrivacy:FormControl=new FormControl('public');
  postsCount:number=0;
  openCoverPrivacy=false;
  openPhotoPrivacy=false;
  profileUrl: string | ArrayBuffer | null | undefined=''
  viewImageFlag:string='';
  activeTab:'myposts'|'saved'='myposts'
  PostsList:Ipost[]=[];
  
  

  ngOnInit(): void {
    this.getMyProfileData();
    this.getMyPostsData();
  }

  getMyProfileData():void{
    this.userService.getMyProfile().subscribe({
      next:(res)=>{
        this.myProfile=res.data.user;
        this.userDataService.profilePhotoUrl=this.myProfile.photo;
      },
      error:(err)=>{
          console.log(err);
          
      },
     
      
    })
  }

  getMyPostsData():void{
    const userId:string=JSON.parse(localStorage.getItem('socialUser')!)?._id;
    
    this.userService.getUserPosts(userId).subscribe({
      next:(res)=>{
        this.PostsList=res.data.posts;
        this.postsCount=this.PostsList.length;
    this.activeTab='myposts'
        
      },
      error:(err)=>{
          console.log(err);
          
      }
    })
  }
  getbookmarksData():void{
    this.userService.getbookmarks().subscribe({
      next:(res)=>{
        this.PostsList=res.data.bookmarks;
        console.log(this.PostsList.length);
        
        this.activeTab='saved'
        
      },
      error:(err)=>{
          console.log(err);
          
      }
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
      error:(err)=>{
        console.log(err);
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
      error:(err)=>{
        console.log(err);
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
      this.myProfile.cover='';
      this.userService.removeCoverPhoto().subscribe({
        next:(res)=>{
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      });
    }

viewImage(ImageToView:'cover'|'photo'):void{
  this.viewImageFlag=ImageToView;
}

cancelImageInFullScreen():void{
   this.viewImageFlag='';
}

}
