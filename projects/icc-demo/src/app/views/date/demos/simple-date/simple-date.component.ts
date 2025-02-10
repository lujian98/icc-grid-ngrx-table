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

  dateFieldConfig = {
    fieldType: 'date',
    fieldName: 'createdate',
    fieldLabel: 'Create Date',
    editable: true,
    readonly: true,
    minDate: new Date(this.today.getFullYear(), this.today.getMonth() - 4, 1),
    maxDate: new Date(this.today.getFullYear(), this.today.getMonth() + 3, 0),
  };

  selectedDate = new Date(this.today.getTime() + 7 * (24 * 60 * 60 * 1000));

  dateRangeFieldConfig = {
    fieldType: 'daterange',
    fieldName: 'daterangefield',
    fieldLabel: 'Select Date Range',
    editable: true,
    readonly: true,
    fromMinMax: { fromDate: null, toDate: new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0) },
    toMinMax: { fromDate: new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1), toDate: null },
  };

  options: IccDateRangeOptions = {
    format: 'mediumDate',
    //range: this.range,
    fromMinMax: { fromDate: null, toDate: new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0) },
    toMinMax: { fromDate: new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1), toDate: null },
  };

  @ViewChild('pickerOne', { static: true }) pickerOne!: any;

  ngOnInit(): void {}

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
