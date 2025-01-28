import { IccColumnConfig } from '../../models/grid-column.model';
import { IccFilter } from './filter';

export enum IccSelectFilterValues {
  NOT_NULL = 'not_null',
  NULL = 'null',
}

export class IccSelectFilter<T> extends IccFilter {
  private _choices: any[] = [];
  private _multiSelect = false;

  set multiSelect(val: boolean) {
    this._multiSelect = val;
  }

  get multiSelect(): boolean {
    return this._multiSelect;
  }

  get choices(): any[] {
    if (this.search instanceof Array) {
      this._choices = this.search.map((item) => item.name || item.id);
    } else {
      this._choices = [];
    }
    return this._choices;
  }

  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'select');
  }
}
