import { IccSelectFieldConfig } from '@icc/ui/fields';
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

  // since the set search can only call at parent, the choices need to set when call
  get choices(): any[] {
    // TODO if select object id is not use name
    if (this.search instanceof Array) {
      this._choices = this.search.map((item) => item.name);
    } else {
      this._choices = [];
    }
    return this._choices;
  }

  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'select'); // TODO need add default filterFieldConfig for column type
    const filterFieldConfig = column.filterFieldConfig as IccSelectFieldConfig;
    this.multiSelect = !!filterFieldConfig?.multiSelection;
  }
}
