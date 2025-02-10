import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import {
  getFallbackLocaleMonthAndYearFormat,
  isValidDate,
  monthAndYearFormatOptions,
  toLocalStringSupportsLocales,
} from '../date-utils/date.utils';

@Pipe({
  name: 'monthAndYear',
  standalone: false,
})
export class IccMonthYearPipe implements PipeTransform {
  private readonly toLocaleStringSupportsLocales: boolean;

  constructor(@Inject(LOCALE_ID) private localeID: string) {
    this.toLocaleStringSupportsLocales = toLocalStringSupportsLocales();
  }
  transform(value: any, locale = this.localeID, format?: string) {
    if (!isValidDate(value)) {
      return null;
    }

    return this.toLocaleStringSupportsLocales && !format
      ? value.toLocaleString(locale, monthAndYearFormatOptions)
      : formatDate(value, format || getFallbackLocaleMonthAndYearFormat(locale), locale);
  }
}
