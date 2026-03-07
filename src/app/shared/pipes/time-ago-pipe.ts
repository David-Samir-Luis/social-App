import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string): Observable<string> {
    return timer(0, 60000).pipe(
      map(() => {
        const s = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
        if (s < 60) return s + 's';
        if (s < 3600) return Math.floor(s / 60) + 'm';
        if (s < 86400) return Math.floor(s / 3600) + 'h';
        if (s < 2592000) return Math.floor(s / 86400) + 'd';
        if (s < 31536000) return Math.floor(s / 2592000) + 'mo';
        return Math.floor(s / 31536000) + 'y';
      })
    );
  }

}