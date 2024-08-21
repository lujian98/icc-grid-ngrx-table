import { IccColumnConfig } from '../../models/grid-column.model';
//import { IccDateFilter } from './date_filter';
import { IccFilter } from './filter';
import { IccFilterFactory } from './filter_factory';

export class IccFilters {
  private _filters: Array<IccFilter> = [];

  get filters(): Array<IccFilter> {
    return this._filters;
  }
/*
  setFilters(columns: IccColumnConfig[]) {
    const factory = new IccFilterFactory();
    columns.forEach((column: IccColumnConfig, index) => {
      const filter = factory.getFilter(column, columns);
      this._filters.push(filter);
    });
  }
    */

  update(filteredValues: { [index: string]: any }) {
    this.filters.forEach((filter) => {
      const key = filter.key;
      /*
      if (filter.type === 'date') {
        const f = filter as IccDateFilter;
        f.range = filteredValues[key];
      } else {
        */
        if (filteredValues[key]) {
          let value = filteredValues[key];
          if (value instanceof Array) {
            value = value.join();
          }
          filter.search = value;
        } else {
          filter.search = '';
        }
      //}
    });
  }
}
