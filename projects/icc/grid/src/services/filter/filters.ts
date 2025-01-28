import { IccFilter } from './filter';

export class IccFilters {
  private _filters: Array<IccFilter> = [];

  get filters(): Array<IccFilter> {
    return this._filters;
  }

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
    });
  }
}
