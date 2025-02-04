import { IccColumnConfig } from '../../models/grid-column.model';
import { IccNumberFilter } from './number_filter';
import { IccTextFilter } from './text_filter';
import { IccSelectFilter } from './select_filter';

export class IccFilterFactory {
  componentMapper: { [index: string]: any } = {};

  constructor() {
    this.componentMapper = {
      text: IccTextFilter,
      number: IccNumberFilter,
      select: IccSelectFilter,
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
