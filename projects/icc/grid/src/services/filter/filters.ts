import { IccFilter } from './filter';

export class IccFilters {
  private _filters: Array<IccFilter> = [];

  get filters(): Array<IccFilter> {
    return this._filters;
  }

  update<T>(filteredValues: { [index: string]: string | string[] }) {
    this.filters.forEach((filter) => {
      const key = filter.key;
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
