import { IccColumnConfig } from '../../models/grid-column.model';
import { IccNumberFilter } from './number_filter';
import { IccTextFilter } from './text_filter';

export class IccFilterFactory {
  componentMapper: { [index: string]: any } = {};

  constructor() {
    this.componentMapper = {
      text: IccTextFilter,
      number: IccNumberFilter,
    };
  }

  getFilter(column: IccColumnConfig) {
    const fieldType = column.fieldType!;
    let component = this.componentMapper[fieldType];
    if (!component) {
      component = this.componentMapper['text'];
    }
    const componentRef = new component(column, column.name);
    return componentRef;
  }
  //   constructor(column: IccColumnConfig, key: string) {
  /*
  getFilter(column: IccColumnConfig, columns: IccColumnConfig[]) {
    let type = 'text';
    let filterField = column.name;
    if (column.filterField) {
      if (typeof column.filterField === 'string') {
        filterField = column.filterField;
        type = this.getFilterType(filterField, columns);
      } else {
        const fieldType = column.fieldType || 'string';
        // type = typeof fieldType === 'string' ? fieldType : fieldType.type;
      }
    }
    let component = this.componentMapper[type];
    if (!component) {
      component = this.componentMapper['text'];
    }
    const componentRef = new component(column, filterField);
    return componentRef;
  }
    */

  private getFilterType(filterField: string, columns: IccColumnConfig[]): string {
    let type = 'text';
    columns.forEach((column) => {
      if (column.name === filterField) {
        const fieldType = column.fieldType;
        // type = typeof fieldType === 'string' ? fieldType : fieldType.type;
        type = typeof fieldType === 'string' ? fieldType : 'text';
      }
    });
    return type;
  }
}
