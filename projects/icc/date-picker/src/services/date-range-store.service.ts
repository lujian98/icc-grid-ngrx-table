import { Injectable, Inject, InjectionToken } from '@angular/core';
import { IccDateRange } from '../model/model';
import { Subject } from 'rxjs';

export const DATE = new InjectionToken<Date>('date');

@Injectable()
export class IccDateRangeStoreService {
  rangeUpdate$: Subject<IccDateRange> = new Subject<IccDateRange>();
  updateSelected$: Subject<Date | undefined> = new Subject<Date | undefined>();

  constructor(
    @Inject(DATE) private _selectedDate: Date | null | undefined,
    @Inject(DATE) private _fromDate: Date | null,
    @Inject(DATE) private _toDate: Date | null,
  ) {}

  get selectedDate(): Date | null | undefined {
    return this._selectedDate;
  }

  get fromDate(): Date | null {
    return this._fromDate;
  }

  get toDate(): Date | null {
    return this._toDate;
  }

  updateRange(fromDate: Date | null = this._fromDate, toDate: Date | null = this._toDate) {
    this._fromDate = fromDate;
    this._toDate = toDate;
    const range: IccDateRange = {
      fromDate: this._fromDate,
      toDate: this._toDate,
    };
    this.rangeUpdate$.next(range);
  }

  updateSelected(selectedDate: Date | null | undefined) {
    this._selectedDate = selectedDate;
    this.updateSelected$.next(this._selectedDate ? this._selectedDate : undefined);
  }

  clearSelected() {
    this._selectedDate = null;
    this.updateSelected$.next(undefined);
  }
}
