import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class IccFilterPipe implements PipeTransform {
  transform<T>(items: { [key: string]: T }[], searchTerm: string, labelKey?: string): { [key: string]: T }[] {
    if (!items || !searchTerm || typeof searchTerm === 'object' || searchTerm.includes(',')) {
      return items;
    }
    return items.filter(
      (item) => (item[labelKey || 'label'] as string).toLowerCase().includes(searchTerm.toLowerCase()) === true,
    );
  }
}
