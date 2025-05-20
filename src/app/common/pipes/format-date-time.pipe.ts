import {Pipe, PipeTransform} from '@angular/core';
import {dateToString} from '../utils/utils';


@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {

  transform(date: Date | string, type?: 'date' | 'time' | 'datetime'): any {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }

    let format: string = 'dd.MM.yyyy';

    if (type === 'time') {
      format = 'HH:mm:ss';
    } else if (type === 'datetime') {
      format = 'dd.MM.yyyy HH:mm:ss';
    }

    return dateToString(date, format);
  }

}
