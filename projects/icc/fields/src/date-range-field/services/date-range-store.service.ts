import { Injectable } from '@angular/core';
import { IccDateRange } from '../models/date-range-field.model';
import { Subject } from 'rxjs';

@Injectable()
export class IccDateRangeStoreService {
  private _fromDate: Date | null = null;
  private _toDate: Date | null = null;

  rangeUpdate$: Subject<IccDateRange> = new Subject<IccDateRange>();

  get fromDate(): Date | null {
    return this._fromDate;
  }

  get toDate(): Date | null {
    return this._toDate;
  }

  updateRange(fromDate: Date | null, toDate: Date | null) {
    this._fromDate = fromDate;
    this._toDate = toDate;
    const range: IccDateRange = {
      fromDate: this._fromDate,
      toDate: this._toDate,
    };
    this.rangeUpdate$.next(range);
  }
}
