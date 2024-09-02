import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    if (!value) {
      return '';
    } else {
      const toString = value.toString();
      const words = toString.split(' ');
      const initials = words.map(word => word.charAt(0)).join('');
      return initials.toUpperCase();
    }
  }

}
