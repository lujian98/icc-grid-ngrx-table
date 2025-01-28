import { IccSelectFilter } from '../../filter/select_filter';
import { IccRansackFilter } from './filter';

export class IccRansackSelectFilter<T> extends IccRansackFilter<T> {
  private _filter!: IccSelectFilter<T>;

  set filter(val: IccSelectFilter<T>) {
    this._filter = val;
  }

  get filter(): IccSelectFilter<T> {
    return this._filter;
  }

  getParams(): T[] {
    const choices = this.filter.choices;
    const params: T[] = [];
    if (choices.length > 0) {
      choices.forEach((value) => {
        let key = this.filter.field + (choices.length > 1 ? '_in[]' : '_in');
        const p: { [index: string]: any } = {};
        let val = value;
        if (value === 'isEmpty') {
          key = this.filter.field + '_null';
          val = 1;
        } else if (value === 'notEmpty') {
          key = this.filter.field + '_not_null';
          val = 1;
        }
        p[key] = val;
        params.push(p as T);
      });
    }
    return params as T[];
  }
}
