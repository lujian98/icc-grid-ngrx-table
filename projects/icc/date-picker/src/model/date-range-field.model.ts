import { IccDateFieldConfig } from './date-field.model';

export interface IccDateRange {
  fromDate?: Date | null;
  toDate?: Date | null;
}

export interface IccDateRangeFieldConfig extends IccDateFieldConfig {
  startDateLabel: string;
  endDateLabel: string;
  fromMinMax: IccDateRange;
  toMinMax: IccDateRange;
}

export const defaultDateRangeFieldConfig: IccDateRangeFieldConfig = {
  fieldType: 'daterange',
  fieldName: 'daterangefield',
  placeholder: 'DATE_PICKER.CHOOSE_A_DATE_RANGE',
  clearValue: true,

  dateFormat: 'mediumDate',
  excludeWeekends: false,
  startDateLabel: 'DATE_PICKER.FROM',
  endDateLabel: 'DATE_PICKER.TO',
  fromMinMax: { fromDate: null, toDate: null },
  toMinMax: { fromDate: null, toDate: null },
};
