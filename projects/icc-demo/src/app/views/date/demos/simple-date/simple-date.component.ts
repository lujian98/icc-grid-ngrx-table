import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {
  IccDatePickerModule,
  IccDatePickerComponent,
  IccDateRangePickerComponent,
  IccDateRange,
  IccDateRangeOptions,
  IccDateSelectionOptions,
  IccDatePresetItem,
} from '@icc/ui/date-picker';

@Component({
  selector: 'app-simple-date',
  templateUrl: './simple-date.component.html',
  styleUrls: ['./simple-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccDatePickerModule, IccDatePickerComponent, IccDateRangePickerComponent],
})
export class AppSimpleDateComponent implements OnInit {
  range: IccDateRange = { fromDate: new Date(), toDate: new Date() };
  options!: IccDateRangeOptions;
  dateoptions!: IccDateRangeOptions; //IccDateSelectionOptions;

  presets: Array<IccDatePresetItem> = [];
  presets2: Array<IccDatePresetItem> = [];

  @ViewChild('pickerOne', { static: true }) pickerOne!: any;

  ngOnInit(): void {
    const today = new Date();
    const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    this.setupPresets();
    this.options = {
      //presets: this.presets,
      format: 'mediumDate',
      range: { fromDate: today, toDate: today },
      fromMinMax: { fromDate: null, toDate: fromMax },
      toMinMax: { fromDate: toMin, toDate: null },
    };

    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
    const minDate = new Date(today.getFullYear(), today.getMonth() - 4, 1);
    const selectedDate = new Date(today.getTime() - 6 * (24 * 60 * 60 * 1000));
    this.dateoptions = {
      presets: this.presets2,
      format: 'mediumDate',
      range: { fromDate: today, toDate: today },
      selectedDate: selectedDate,
      minMax: { fromDate: minDate, toDate: maxDate },
    };
    console.log(' this.options=', this.options);
  }

  updateRange(range: IccDateRange) {
    this.range = range;
  }

  updateDate(date: Date) {
    console.log(date);
  }

  setupPresets() {
    const backDate = (numOfDays: any) => {
      const day = new Date();
      return new Date(day.setDate(day.getDate() - numOfDays));
    };

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7);
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets = [
      {
        presetLabel: 'DATE_FILTER.YESTERDAY',
        range: { fromDate: yesterday, toDate: today },
      },
      {
        presetLabel: 'DATE_FILTER.LAST_7_DAYS',
        range: { fromDate: minus7, toDate: today },
      },
      {
        presetLabel: 'DATE_FILTER.LAST_30_DAYS',
        range: { fromDate: minus30, toDate: today },
      },
      {
        presetLabel: 'DATE_FILTER.THIS_MONTH',
        range: { fromDate: currMonthStart, toDate: currMonthEnd },
      },
      {
        presetLabel: 'DATE_FILTER.LAST_MONTH',
        range: { fromDate: lastMonthStart, toDate: lastMonthEnd },
      },
    ];

    this.presets2 = [
      { presetLabel: 'Today', selectedDate: today },
      { presetLabel: 'Yesterday', selectedDate: yesterday },
      { presetLabel: '7 Days Ago', selectedDate: minus7 },
      { presetLabel: 'This Week', selectedDate: this.get1stDayOfWeek(today) },
      { presetLabel: 'Last Week', selectedDate: this.get1stDayOfWeek(minus7) },
      { presetLabel: 'This Month', selectedDate: currMonthStart },
      { presetLabel: 'Last Month', selectedDate: lastMonthStart },
    ];
  }

  get1stDayOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 0);
    return new Date(date.getFullYear(), date.getMonth(), diff);
  }
}
