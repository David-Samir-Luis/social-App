import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenImageFullScreenService {
  imageUrl:string='';
  openImagebyURL(URL:string):void {
    this.imageUrl=URL;
  }
  closeImage():void{
    this.imageUrl='';
  }
}
