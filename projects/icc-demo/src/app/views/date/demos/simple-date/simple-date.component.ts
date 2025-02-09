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
  today = new Date();
  range: IccDateRange = {
    fromDate: new Date(),
    toDate: new Date(this.today.getFullYear(), this.today.getMonth() + 2, 0),
  };
  options!: IccDateRangeOptions;
  dateoptions!: IccDateRangeOptions; //IccDateSelectionOptions;

  dateFieldConfig = {
    fieldType: 'date',
    fieldName: 'createdate',
    fieldLabel: 'Create Date',
    editable: true,
    readonly: true,
    minDate: new Date(this.today.getFullYear(), this.today.getMonth() - 4, 1),
    maxDate: new Date(this.today.getFullYear(), this.today.getMonth() + 3, 0),
  };

  presets: Array<IccDatePresetItem> = [];
  presets2: Array<IccDatePresetItem> = [];

  @ViewChild('pickerOne', { static: true }) pickerOne!: any;

  ngOnInit(): void {
    const today = new Date();
    const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    this.options = {
      format: 'mediumDate',
      range: this.range,
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

  valueChange(date: Date | string) {
    console.log(date);
  }

  get1stDayOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 0);
    return new Date(date.getFullYear(), date.getMonth(), diff);
  }
}
