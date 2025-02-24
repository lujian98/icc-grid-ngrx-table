import { IccDateRangeFilter } from '../../filter/date-range-filter';
import { IccRansackFilter } from './filter';

export class IccRansackDateRangeFilter<T> extends IccRansackFilter<T> {
  private _filter!: IccDateRangeFilter;

  set filter(val: IccDateRangeFilter) {
    this._filter = val;
  }

  get filter(): IccDateRangeFilter {
    return this._filter;
  }

  getParams(): T[] {
    const range = this.filter.range;
    const params = [];
    if (range?.fromDate && range?.toDate) {
      const begin = range.fromDate instanceof Date ? range.fromDate : new Date(range.fromDate);
      const end = range.toDate instanceof Date ? range.toDate : new Date(range.toDate);
      const field = this.filter.field;
      let p1: { [index: string]: string } = {};
      p1[field + '_gteq'] = this.encodeISODate(begin);
      params.push(p1);
      p1 = {};
      p1[field + '_lteq'] = this.encodeISODate(end);
      params.push(p1);
    }
    return params as T[];
  }

  private encodeISODate(date: Date) {
    return encodeURIComponent(date.toISOString());
  }
}
