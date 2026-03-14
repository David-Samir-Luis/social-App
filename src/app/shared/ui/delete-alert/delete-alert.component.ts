import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-alert',
  imports: [],
  templateUrl: './delete-alert.component.html',
  styleUrl: './delete-alert.component.css',
})
export class DeleteAlertComponent {
  @Input()data:string[]=[]; //[0] title ,[1] message ,[2] btn text
  @Output() callDeleteFn=new EventEmitter<void>()
  @Output() closeWindow=new EventEmitter<boolean>()
  loading:boolean=false;

  close():void{
    this.closeWindow.emit(false)
  }

  callDelete(){
    this.loading=true;
    this.callDeleteFn.emit()
  }



}
