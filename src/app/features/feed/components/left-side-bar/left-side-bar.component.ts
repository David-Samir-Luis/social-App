import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-left-side-bar',
  imports: [RouterLink],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css',
})
export class LeftSideBarComponent implements OnInit {
  private readonly activatedRoute= inject(ActivatedRoute);
  activeBtn:string='feed';

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        this.activeBtn=query.get('tab')||'feed';
      }
    )
  }


}
