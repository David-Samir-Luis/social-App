import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(list: IuserLike[] | IsuggestedUser[],search: string) {
    return list.filter((item)=>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }

}
