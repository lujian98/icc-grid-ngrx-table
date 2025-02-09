import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ngx-translate/core';
import { MatCalendar, MatCalendarUserEvent, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { IccDateConfigStoreService } from '../services/date-config-store.service';
import { IccLocaleDatePipe } from '@icc/ui/core';

@Component({
  selector: 'icc-calendar-wrapper',
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // use Default to sync calendar
  imports: [CommonModule, TranslateDirective, IccLocaleDatePipe, MatCalendar],
})
export class IccCalendarWrapperComponent implements AfterViewInit, OnChanges, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  dateFormat: string | undefined;
  currentMonth: Date | null;
  _selectedDate: Date | null = null;
  private _selectedRangeDates: Array<Date> = [];

  @Input() set selectedDate(value: Date | null | undefined) {
    if (value instanceof Date) {
      this._selectedDate = value;
      this.matCalendar.activeDate = this.selectedDate!;
    } else {
      this._selectedDate = null;
    }
  }
  get selectedDate(): Date | null {
    return this._selectedDate;
  }

  @Input() prefixLabel!: string;
  @Input() minDate!: Date | null;
  @Input() maxDate!: Date | null;

  @Input() set selectedRangeDates(value: Array<Date>) {
    this._selectedRangeDates = value;
    this.changeDetectorRef.detectChanges();
  }
  get selectedRangeDates(): Array<Date> {
    return this._selectedRangeDates;
  }

  @ViewChild(MatCalendar, { static: true }) matCalendar!: MatCalendar<Date>;
  @Output() readonly selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() readonly monthViewChange: EventEmitter<Date> = new EventEmitter<Date>();

  private sub!: Subscription;

  weekendFilter = (d: Date) => true;
  constructor(private configStore: IccDateConfigStoreService) {
    this.dateFormat = configStore.dateRangeOptions.format;
    if (configStore.dateRangeOptions.excludeWeekends) {
      this.weekendFilter = (d: Date): boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      };
    }
    this.currentMonth = this.getFirstDay(new Date());
  }

  ngAfterViewInit() {
    if (this.matCalendar) {
      this.sub = this.matCalendar.stateChanges.subscribe(() => {
        this.onMonthSelected(this.matCalendar.activeDate);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Material calendar bug - sometime not able refresh view when set maxDate/minDate
    if (!this.maxDate) {
      this.maxDate = new Date('2222-06-24T18:30:00.000Z');
      setTimeout(() => {
        this.maxDate = null;
      }, 10);
    }
    if (!this.minDate) {
      this.minDate = new Date('1900-01-01T18:30:00.000Z');
      setTimeout(() => {
        this.minDate = null;
      }, 10);
    }
  }

  onSelectedChange(date: Date | null) {
    this.selectedDateChange.emit(date ? date : undefined);
  }

  onMonthSelected(date: Date) {
    if (date) {
      const newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      if (this.currentMonth && !this.isSameMonth(newMonth, this.currentMonth)) {
        this.currentMonth = newMonth;
        this.monthViewChange.emit(newMonth);
      }
    }
  }

  isSameMonth(date: Date, pDate: Date): boolean {
    return date.getFullYear() === pDate.getFullYear() && date.getMonth() === pDate.getMonth();
  }

  getFirstDay(date: Date): Date | null {
    if (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return null;
  }

  onYearSelected(e: Date) {}

  onUserSelection(e: MatCalendarUserEvent<Date | null>) {}

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      //console.log( ' this.selectedRangeDates=', this.selectedRangeDates)
      if (this.selectedRangeDates.length > 0) {
        const find = this.selectedRangeDates.findIndex(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear(),
        );
        if (find === 0) {
          return 'icc-date-range-selected-date-start';
        } else if (find === this.selectedRangeDates.length - 1) {
          return 'icc-date-range-selected-date-end';
        } else if (find > 0) {
          return 'icc-date-range-dates';
        }
      }
      return '';
    };
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
