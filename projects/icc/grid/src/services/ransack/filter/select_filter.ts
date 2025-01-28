import { IccSelectFilter, IccSelectFilterValues } from '../../filter/select_filter';
import { IccRansackFilter } from './filter';
//import { IccSelectField } from '../../../fields/select_field';
//import { IccSelectOption } from '../../../fields/fieldConfig.model';

// Really multi-select
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
    let key = '';
    if (choices.length > 0) {
      const column = this.filter.column;
      key = this.filter.field + (this.filter.multiSelect ? '_in[]' : '_in');
      choices.forEach((value) => {
        const p: { [index: string]: any } = {};
        const val = value;
        p[key] = val;
        params.push(p as T);
        /*
        const selections = column.getSelectedItem(value);
        const hasOptionFields = this.hasOptionFields(selections);
        const selectParent = column.getSelectParentItem(value);
        const fieldKeys = this.getFilterKey(selections, key);
        const val = this.getFilterValue(selectParent, value, hasOptionFields);
        fieldKeys.forEach((fieldKey) => {
          const p: { [index: string]: any } = {};
          if (val === IccSelectFilterValues.NOT_NULL) {
            fieldKey = `${this.filter.field}_${IccSelectFilterValues.NOT_NULL}`;
            p[fieldKey] = 1;
          } else if (val === IccSelectFilterValues.NULL) {
            fieldKey = `${this.filter.field}_${IccSelectFilterValues.NULL}`;
            p[fieldKey] = 1;
          } else {
            p[fieldKey] = val;
          }
          params.push(p as T);
        });*/
      });
    }
    //console.log(' 2222 params=', params);
    return params as T[];
  }

  /*
  private hasOptionFields(selections: IccSelectOption[]): boolean {
    return selections.length !== 0 && !!selections[0].optionFields && selections[0].optionFields.length > 0;
  }

  private getFilterKey(selections: IccSelectOption[], key: string): string[] {
    const keys = [];
    if (selections.length !== 0) {
      const selected = selections[0];
      if (selected.optionFields && selected.optionFields.length > 0) {
        selected.optionFields.forEach((field) => {
          keys.push(field + (this.filter.multiSelect ? '_in[]' : '_in'));
        });
      }
    }
    if (keys.length === 0) {
      keys.push(key);
    }
    return keys;
  }


  private getFilterValue(
    selections: IccSelectOption[],
    value: string | number,
    hasOptionFields: boolean
  ): string | number {
    if (hasOptionFields && selections.length !== 0) {
      const selected = selections[0];
      if (selected.value) {
        value = selected.value;
      }
    }
    return value;
  }*/
}
