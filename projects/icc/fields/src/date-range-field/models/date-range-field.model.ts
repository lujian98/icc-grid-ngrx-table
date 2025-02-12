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
  fieldType: 'dateRange',
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

export interface IccDateRangePresetItem {
  label: string;
  range: IccDateRange;
}

export const presetSelectionConfig = {
  fieldName: 'preset',
  fieldLabel: 'ICC.UI.DATE.PICKER.SELECT_DATE_RANGE',
  labelWidth: 100,
  optionLabel: 'label',
  optionKey: 'range',
  clearValue: false,
};

const backDate = (numOfDays: number) => {
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

export const iccDefaultDateRangePresets: IccDateRangePresetItem[] = [
  {
    label: 'ICC.UI.DATE.FILTER.YESTERDAY',
    range: { fromDate: yesterday, toDate: today },
  },
  {
    label: 'ICC.UI.DATE.FILTER.LAST_7_DAYS',
    range: { fromDate: minus7, toDate: today },
  },
  {
    label: 'ICC.UI.DATE.FILTER.LAST_30_DAYS',
    range: { fromDate: minus30, toDate: today },
  },
  {
    label: 'ICC.UI.DATE.FILTER.THIS_MONTH',
    range: { fromDate: currMonthStart, toDate: currMonthEnd },
  },
  {
    label: 'ICC.UI.DATE.FILTER.LAST_MONTH',
    range: { fromDate: lastMonthStart, toDate: lastMonthEnd },
  },
];
