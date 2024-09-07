//import { IccSelectFieldType } from '../../fields/fieldConfig.model';
import { IccColumnConfig } from '../../models/grid-column.model';
//import { IccSelectField } from '../../fields/select_field';
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
    console.log(' 2222 this.search=', this.search);
    if (this.search instanceof Array) {
      this._choices = this.search.map((item) => item.value);
    } else {
      this._choices = [];
    }
    console.log(' 2222 this._choices=', this._choices);
    return this._choices;
  }

  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'select');
    //const fieldType = column.fieldType as IccSelectFieldType;
    //this.multiSelect = !!fieldType.filterMultiSelect;
    this.multiSelect = false;
  }
}
