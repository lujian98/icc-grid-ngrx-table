import { IccColumnConfig } from '../../models/grid-column.model';
import { IccFilter } from './filter';

export class IccTextFilter extends IccFilter {
  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'text');
  }
}
