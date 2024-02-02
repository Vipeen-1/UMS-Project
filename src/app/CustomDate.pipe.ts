import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastLogin'
})
export class LastLoginPipe implements PipeTransform {
  transform(value: Date): string {
    if (value) {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
      return new Intl.DateTimeFormat('en-US', options).format(value);
    } else {
      return 'N/A';
    }
  }
}
