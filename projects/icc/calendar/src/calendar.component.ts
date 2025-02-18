import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses, MatCalendarUserEvent } from '@angular/material/datepicker';
import { IccLocaleDatePipe } from '@icc/ui/core';
import { TranslateDirective } from '@ngx-translate/core';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { IccCalendarConfig, defaultCalendarConfig } from './models/calendar.model';

@Component({
  selector: 'icc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateDirective, IccLocaleDatePipe, MatCalendar],
})
export class IccCalendarComponent implements AfterViewInit, OnChanges, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _calendarConfig: IccCalendarConfig = defaultCalendarConfig;
  private _selectedRangeDates: Array<Date> = [];
  private _selectedDate: Date | null = null;

  private currentMonth!: Date | null;
  minDate!: Date | null;
  maxDate!: Date | null;
  weekendFilter = (d: Date) => true;

  @Input() set calendarConfig(value: Partial<IccCalendarConfig>) {
    this._calendarConfig = { ...defaultCalendarConfig, ...value };
    if (this.calendarConfig.excludeWeekends) {
      this.weekendFilter = (d: Date): boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      };
    }
    this.minDate = this.calendarConfig.minDate;
    this.maxDate = this.calendarConfig.maxDate;
  }
  get calendarConfig(): IccCalendarConfig {
    return this._calendarConfig;
  }

  @Input() set selectedDate(value: Date | null) {
    if (value instanceof Date) {
      this.matCalendar.activeDate = value;
      this._selectedDate = value;
    } else {
      this._selectedDate = null;
      if (this.calendarConfig.viewType === 'rangeTo') {
        const current = new Date();
        this.matCalendar.activeDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
      }
    }
  }
  get selectedDate(): Date | null {
    return this._selectedDate;
  }

  @Input() set selectedRangeDates(value: Array<Date>) {
    this._selectedRangeDates = value;
    if (this.selectedDate) {
      this.matCalendar.activeDate = this.selectedDate;
    } else {
      this.matCalendar.activeDate = new Date();
    }
    this.changeDetectorRef.detectChanges();
  }
  get selectedRangeDates(): Array<Date> {
    return this._selectedRangeDates;
  }

  @ViewChild(MatCalendar, { static: true }) matCalendar!: MatCalendar<Date>;
  @Output() readonly selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() readonly monthViewChange: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {
    this.currentMonth = this.getFirstDay(new Date());
  }

  ngAfterViewInit(): void {
    if (this.matCalendar) {
      this.matCalendar.stateChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.onMonthSelected(this.matCalendar.activeDate);
      });
    }
  }

  ngOnChanges(): void {
    // Material calendar bug - sometime not able refresh view when set maxDate/minDate
    // matCalendar.activeDate need add to input changes (not here) except with min/max in the calendarConfig
    if (!this.maxDate) {
      this.maxDate = new Date('2222-06-24T18:30:00.000Z');
      timer(10)
        .pipe(take(1))
        .subscribe(() => (this.maxDate = null));
    }
    if (!this.minDate) {
      this.minDate = new Date('1900-01-01T18:30:00.000Z');
      timer(10)
        .pipe(take(1))
        .subscribe(() => (this.minDate = null));
    }
  }

  onSelectedChange(date: Date | null): void {
    this.selectedDateChange.emit(date ? date : undefined);
  }

  onMonthSelected(date: Date): void {
    if (date) {
      const newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      if (this.currentMonth && !this.isSameMonth(newMonth, this.currentMonth)) {
        this.currentMonth = newMonth;
        this.monthViewChange.emit(newMonth);
      }
    }
  }

  private isSameMonth(date: Date, pDate: Date): boolean {
    return date.getFullYear() === pDate.getFullYear() && date.getMonth() === pDate.getMonth();
  }

  private getFirstDay(date: Date): Date | null {
    if (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return null;
  }

  onYearSelected(e: Date): void {}

  onUserSelection(e: MatCalendarUserEvent<Date | null>): void {}

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
