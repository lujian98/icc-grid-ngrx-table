import { IccDateRange } from '@icc/ui/fields';
import { IccColumnConfig } from '../../models/grid-column.model';
import { IccFilter } from './filter';

export class IccDateRangeFilter extends IccFilter {
  private _range!: IccDateRange;

  set range(val: IccDateRange) {
    this._range = val;
  }

  get range(): IccDateRange {
    return this._range;
  }

  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'dateRange');
  }
}
