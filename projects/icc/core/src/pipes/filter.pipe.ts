import { Pipe, PipeTransform } from '@angular/core';

// TODO move to core and/or utils
@Pipe({
  name: 'filter',
  standalone: true,
})
export class IccFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, labelKey?: string): any {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items;
    }
    return items.filter((item) => item[labelKey || 'label'].toLowerCase().includes(searchTerm.toLowerCase()) === true);
  }
}
