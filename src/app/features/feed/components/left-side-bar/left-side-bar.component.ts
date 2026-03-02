import { Component } from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  imports: [],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css',
})
export class LeftSideBarComponent {

  activeBtn:string='feed';
  setActive(btn:string):void{
    this.activeBtn=btn;
  }

}
