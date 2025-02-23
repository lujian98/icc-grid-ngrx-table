import { Pipe, PipeTransform } from '@angular/core';

// TODO type { [key: string]: T }[] | string[]
@Pipe({
  name: 'filter',
})
export class IccFilterPipe implements PipeTransform {
  transform<T>(items: any[], searchTerm: string, labelKey: string, singleListOption: boolean): any[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items;
    }

    if (singleListOption) {
      const find = items.find((item) => item === searchTerm);
      return find ? items : items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()) === true);
    } else {
      return items.filter((item) => {
        const value = item[labelKey || 'label'] as string;
        return value.toLowerCase().includes(searchTerm.toLowerCase()) === true;
      });
    }
  }
}
