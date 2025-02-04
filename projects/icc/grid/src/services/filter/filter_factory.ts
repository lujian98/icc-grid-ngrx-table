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
    console.log(' column=', column);
    const filerType = typeof column.filterField === 'string' ? column.filterField : 'text';
    let component = this.componentMapper[filerType];
    if (!component) {
      component = this.componentMapper['text'];
    }
    const componentRef = new component(column, column.name);
    return componentRef;
  }
}
