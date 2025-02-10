import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class IccDateStoreService {
  private _selectedDate: Date | null | undefined;

  updateSelected$: Subject<Date | undefined> = new Subject<Date | undefined>();

  get selectedDate(): Date | null | undefined {
    return this._selectedDate;
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
