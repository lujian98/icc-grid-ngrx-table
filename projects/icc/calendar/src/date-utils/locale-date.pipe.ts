import { Pipe, PipeTransform } from '@angular/core';
//import { IccTranslationService } from 'iccbird-seven-ui/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localeDate',
  standalone: true,
})
export class IccLocaleDatePipe implements PipeTransform {
  constructor() //  private translationService: IccTranslationService
  {}

  transform(value: any, format?: string) {
    if (!value) {
      return '';
    }
    // const locale = this.translationService.currentLang || 'en-US';
    const locale = 'en-US';
    return new DatePipe(locale).transform(value, format);
  }
}
