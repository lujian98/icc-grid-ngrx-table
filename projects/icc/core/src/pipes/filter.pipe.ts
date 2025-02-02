import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class IccFilterPipe implements PipeTransform {
  transform(items: { [key: string]: string }[], searchTerm: string, labelKey?: string): { [key: string]: string }[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items;
    }
    return items.filter((item) => item[labelKey || 'label'].toLowerCase().includes(searchTerm.toLowerCase()) === true);
  }
}
