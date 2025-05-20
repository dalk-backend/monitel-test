import {SimpleChange} from '@angular/core';
import {format, isDate} from 'date-fns';
import {ru as locale} from 'date-fns/locale';
import {TransformFnParams} from 'class-transformer';


/**
 * Форматируем строку в дату.
 * Используется для @Transform(dateToClass(), { toClassOnly: true })
 */
export function dateToClass(): (value: any) => Date | null {
  return value => {
    if (value && value.value !== null) {
      if (value.value instanceof Date) {
        return value.value;
      } else {
        return new Date(value.value);
      }
    }

    return null;
  };
}

/**
 * Форматируем дату в строку, по умолчанию формат 'yyyy-MM-dd',
 * чтобы сделать дату строкой, нужно вложить 'full'
 * Используется для @Transform(dateToPlain(), { toPlainOnly: true })
 *
 * Все форматы можно посмотреть по ссылке https://date-fns.org/v2.17.0/docs/format
 */

export function dateToPlain(strFormat: string = 'yyyy-MM-dd'): (params: TransformFnParams) => string | null {
  return ({value}) => value ? format(value, strFormat) : null;
}


export function isOnChanges(simpleChange: SimpleChange): boolean {
  return simpleChange && simpleChange.currentValue && simpleChange.currentValue !== simpleChange.previousValue;
}

export function dateToString(value: Date | string | null | undefined, strFormat: string = 'yyyy-MM-dd'): string {
  if (typeof value === 'string' && !!value) {
    value = new Date(value);
  }

  if (typeof value === 'number' || isDate(value)) {
    return format(value, strFormat, {locale});
  }

  return '';
}
