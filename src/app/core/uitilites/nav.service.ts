import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private readonly location=inject(Location)


  goBack(){
    this.location.back();
  }
  
}
