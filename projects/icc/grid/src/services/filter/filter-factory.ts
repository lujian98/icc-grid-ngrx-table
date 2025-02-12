import { IccColumnConfig } from '../../models/grid-column.model';
import { IccNumberFilter } from './number-filter';
import { IccTextFilter } from './text-filter';
import { IccSelectFilter } from './select-filter';
import { IccDateRangeFilter } from './date-range-filter';

export class IccFilterFactory {
  componentMapper: { [index: string]: any } = {};

  constructor() {
    this.componentMapper = {
      text: IccTextFilter,
      number: IccNumberFilter,
      select: IccSelectFilter,
      dateRange: IccDateRangeFilter,
    };
  }

  getFilter(column: IccColumnConfig) {
    const filterType = this.getFilterType(column);
    let component = this.componentMapper[filterType];
    if (!component) {
      component = this.componentMapper['text'];
    }
    const componentRef = new component(column, column.name);
    return componentRef;
  }

  private getFilterType(column: IccColumnConfig): string {
    if (typeof column.filterField === 'string') {
      return column.filterField;
    } else if (column.filterFieldConfig?.fieldType) {
      return column.filterFieldConfig?.fieldType;
    }

    return 'text';
  }
}
