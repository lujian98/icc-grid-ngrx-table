import { IccBaseField } from '@icc/ui/fields';

export interface IccDateFieldConfig extends IccBaseField {
  //selectedDate?: Date | null; -> should be input value
  selectedLabel?: string; // -> prefixLabel
  minDate?: Date;
  maxDate?: Date;
  format?: string; // 'mediumDate'
  //locale?: string; //???
  // inputPrefix: string; ??? no need
}

export interface IccDateRange {
  fromDate?: Date | null;
  toDate?: Date | null;
}

export interface IccDateRangeFieldConfig extends IccDateFieldConfig {
  range: IccDateRange;
  fromMinMax?: IccDateRange;
  toMinMax?: IccDateRange;
  startDateLabel?: string;
  endDateLabel?: string;
}

export const defaultDateFieldConfig: IccDateFieldConfig = {
  fieldType: 'date',
  fieldName: 'datefield',
  placeholder: 'ICC.UI.FIELDS.DATE.PLACEHOLDER',
  clearValue: true,
  //selectedDate?: Date | null;
};

/*
    [prefixLabel]="datePrefix"
    [selectedDate]="selectedDate"
    [minDate]="minDate"
    [maxDate]="maxDate"

export interface IccDateSelectionOptions {
  format?: string;
  excludeWeekends?: boolean;
  locale?: string;
  selectedDate?: Date | null;
  minMax?: IccDateRange;
  applyLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
  animation?: boolean;
  calendarOverlayConfig?: IccCalendarOverlayConfig;
  datePrefix?: string;
}

*/
