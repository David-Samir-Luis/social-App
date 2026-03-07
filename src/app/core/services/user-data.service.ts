import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  profilePhotoUrl:string='';
  name:string='';
  _id:string='';
}
