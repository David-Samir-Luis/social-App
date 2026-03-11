import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { SinglePostComponent } from "../../shared/ui/single-post/single-post.component";
import { LoadingComponent } from "../../shared/ui/loading/loading.component";
import { NavService } from '../../core/uitilites/nav.service';

@Component({
  selector: 'app-details',
  imports: [SinglePostComponent, LoadingComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly postsService=inject(PostsService);
  readonly navService=inject(NavService);
  private readonly router=inject(Router);

    post!:Ipost;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      param=>{
        this.getSinglePostData(param.get('id')!)
      }
    )
  }


  getSinglePostData(postId:string):void{
    this.postsService.getSinglePost(postId).subscribe(
          res =>{
            this.post=res.data.post;
          }
        )
  }

  returnToFeed():void{
    this.router.navigate(['/feed']);
  }

}
