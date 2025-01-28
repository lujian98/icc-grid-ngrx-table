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
      const key = this.filter.field + (choices.length > 1 ? '_in[]' : '_in');
      choices.forEach((value) => {
        const p: { [index: string]: any } = {};
        const val = value;
        p[key] = val;
        params.push(p as T);
      });
    }
    return params as T[];
  }
}
