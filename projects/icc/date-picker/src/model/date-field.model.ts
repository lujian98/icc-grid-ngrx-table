import { IccBaseField } from '@icc/ui/fields';

export interface IccDateFieldConfig extends IccBaseField {
  //selectedDate?: Date | null; -> should be input value
  selectedLabe?: string; // -> prefixLabel
  minDate?: Date;
  maxDate?: Date;
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
  presets?: Array<IccDatePresetItem>;
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
  placeholder?: string;
  datePrefix?: string;
  inputPrefix?: string;
}

*/
