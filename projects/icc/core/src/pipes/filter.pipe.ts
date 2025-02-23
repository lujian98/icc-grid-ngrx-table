import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class IccFilterPipe implements PipeTransform {
  transform<T>(
    items: { [key: string]: T }[],
    searchTerm: string,
    labelKey: string,
    singleListOption: boolean,
  ): { [key: string]: T }[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items;
    }

    if (singleListOption) {
      return items; // TODO filter for autocomplete
    } else {
      return items.filter((item) => {
        const value = item[labelKey || 'label'] as string;
        return value.toLowerCase().includes(searchTerm.toLowerCase()) === true;
      });
    }
  }
}
