import { Injectable } from '@angular/core';
import { IccDateRangeOptions } from '../model/model';

@Injectable()
export class IccDateConfigStoreService {
  private defaultOptions = {
    excludeWeekends: false,
    animation: true,
    locale: 'en-US',
    format: 'mediumDate',
    minMax: { fromDate: new Date('1900-01-01T18:30:00.000Z'), toDate: new Date('2222-06-24T18:30:00.000Z') },
    fromMinMax: { fromDate: null, toDate: null },
    toMinMax: { fromDate: null, toDate: null },
  };
  private _dateRangeOptions: Partial<IccDateRangeOptions> = this.defaultOptions;

  get dateRangeOptions(): Partial<IccDateRangeOptions> {
    return this._dateRangeOptions;
  }

  set dateRangeOptions(options: Partial<IccDateRangeOptions>) {
    this._dateRangeOptions = { ...this.defaultOptions, ...options };
  }
}
