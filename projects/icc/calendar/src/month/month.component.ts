import { WeekDay } from '../common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { getDaysOfMonth, isDateAfter, isSameDate, isValidDate, startOfDay } from '../date-utils/date.utils';

@Component({
  selector: 'icc-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccMonthComponent implements AfterViewInit, OnChanges {
  daysOfMonth!: readonly Date[];
  firstDayOfMonth!: string;
  currentDate = startOfDay(new Date());

  private readonly dateSelector = 'time.icc-month__day';

  @Input() selectedDate?: Date;
  @Input() min?: Date | null;
  @Input() locale?: string;
  @Input() activeDate!: Date;

  private _month!: Date;

  @Input()
  get month() {
    return this._month;
  }

  set month(month: Date) {
    if (!this._month) {
      this._month = month;
      this.daysOfMonth = getDaysOfMonth(this._month);
      this.firstDayOfMonth = WeekDay[this.daysOfMonth[0].getDay()].toLowerCase();
    }
  }

  @Output() selectedDateChange = new EventEmitter<Date>();
  @Output() activeDateChange = new EventEmitter<Date>();

  constructor(public changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.entries(changes).some(([input, change]) => input !== 'month' && !change.firstChange)) {
      this.changeDetectorRef.detectChanges();
    }
  }

  isSelected(dayOfMonth: Date) {
    return !!this.selectedDate && isSameDate(dayOfMonth, this.selectedDate);
  }

  isDisabled(dayOfMonth: Date) {
    return !!this.min && isDateAfter(this.min, dayOfMonth);
  }

  isCurrent(dayOfMonth: Date) {
    return !!this.currentDate && isSameDate(dayOfMonth, this.currentDate);
  }

  onDayOfMonthClick(event: MouseEvent | Event) {
    const target = event.target as HTMLElement;

    if (this.isTimeElement(target)) {
      this.onDateClick(target);
    }
  }

  private onDateClick(timeElem: HTMLTimeElement) {
    const selectedDate = new Date(timeElem.dateTime + 'T00:00');

    if (isValidDate(selectedDate)) {
      this.selectDate(selectedDate);
    }
  }

  private selectDate(date: Date) {
    if (!this.isSelected(date) && !this.isDisabled(date)) {
      this.selectedDateChange.emit(date);
    }
  }

  private isTimeElement(element: HTMLElement): element is HTMLTimeElement {
    return !!element && element.matches(this.dateSelector);
  }
}
