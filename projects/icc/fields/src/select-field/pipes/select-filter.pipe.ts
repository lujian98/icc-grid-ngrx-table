import { Pipe, PipeTransform } from '@angular/core';
import { IccOptionType } from '../models/select-field.model';

@Pipe({
  name: 'selectFilter',
})
export class IccSelectFilterPipe implements PipeTransform {
  transform<T>(items: IccOptionType[], searchTerm: string, labelKey: string, singleListOption: boolean): T[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items as T[];
    }

    if (singleListOption) {
      const data = items as string[];
      const find = data.find((item) => item === searchTerm);
      return (
        find ? data : data.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()) === true)
      ) as T[];
    } else {
      return (items as { [key: string]: T }[]).filter((item) => {
        const value = item[labelKey || 'label'] as string;
        return value.toLowerCase().includes(searchTerm.toLowerCase()) === true;
      }) as T[];
    }
  }
}
