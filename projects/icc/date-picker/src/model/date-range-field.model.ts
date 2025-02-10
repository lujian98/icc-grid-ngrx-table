import { IccDateFieldConfig } from './date-field.model';

export interface IccDateRange {
  fromDate?: Date | null;
  toDate?: Date | null;
}

export interface IccDateRangeFieldConfig extends IccDateFieldConfig {
  //range: IccDateRange;
  startDateLabel: string;
  endDateLabel: string;
  fromMinMax: IccDateRange;
  toMinMax: IccDateRange;
}

export const defaultDateRangeFieldConfig: IccDateRangeFieldConfig = {
  fieldType: 'date',
  fieldName: 'datefield',
  placeholder: 'ICC.UI.FIELDS.DATE.PLACEHOLDER',
  clearValue: true,

  dateFormat: 'mediumDate',
  excludeWeekends: false,
  startDateLabel: 'DATE_PICKER.FROM',
  endDateLabel: 'DATE_PICKER.TO',
  fromMinMax: { fromDate: null, toDate: null },
  toMinMax: { fromDate: null, toDate: null },
};
