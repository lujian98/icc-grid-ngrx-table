import { IccDateRange } from '@icc/ui/fields';
import { IccColumnConfig } from '../../models/grid-column.model';
import { IccFilter } from './filter';

export class IccDateRangeFilter extends IccFilter {
  get range(): IccDateRange {
    return this.search as IccDateRange;
  }

  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'dateRange');
  }
}
