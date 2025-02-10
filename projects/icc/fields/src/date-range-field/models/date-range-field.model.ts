import { IccDateFieldConfig } from '../../date-field/models/date-field.model';

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
  placeholder: 'ICC.UI.DATE.PICKER.SELECT_DATE_RANGE',
  clearValue: true,

  dateFormat: 'mediumDate',
  excludeWeekends: false,
  startDateLabel: 'ICC.UI.DATE.PICKER.FROM',
  endDateLabel: 'ICC.UI.DATE.PICKER.TO',
  fromMinMax: { fromDate: null, toDate: null },
  toMinMax: { fromDate: null, toDate: null },
};
