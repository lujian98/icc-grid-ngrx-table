import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class IccFilterPipe implements PipeTransform {
  transform<T>(
    items: { [key: string]: T }[] | string[],
    searchTerm: string,
    labelKey: string,
    singleListOption: boolean,
  ): { [key: string]: T }[] | string[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items;
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
