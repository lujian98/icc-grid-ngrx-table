import { IccColumnConfig } from '../../models/grid-column.model';
import { IccFilter } from './filter';

export class IccTextFilter extends IccFilter {
  override set search(val: string) {
    this._search = val;
  }

  override get search(): string {
    return this._search as string;
  }

  constructor(column: IccColumnConfig, key: string) {
    super(column, key, 'text');
  }
}
