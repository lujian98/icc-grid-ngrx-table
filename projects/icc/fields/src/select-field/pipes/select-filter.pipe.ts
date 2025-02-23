import { Pipe, PipeTransform } from '@angular/core';
import { IccOptionType } from '../models/select-field.model';
// TODO { [key: string]: T }[] | string[]

@Pipe({
  name: 'selectFilter',
})
export class IccSelectFilterPipe implements PipeTransform {
  transform<T>(items: IccOptionType[], searchTerm: string, labelKey: string, singleListOption: boolean): any[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items as { [key: string]: T }[] | string[];
    }

    if (singleListOption) {
      const data = items as string[];
      const find = data.find((item) => item === searchTerm);
      return find ? data : data.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()) === true);
    } else {
      return (items as { [key: string]: T }[]).filter((item) => {
        const value = item[labelKey || 'label'] as string;
        return value.toLowerCase().includes(searchTerm.toLowerCase()) === true;
      });
    }
  }
}
