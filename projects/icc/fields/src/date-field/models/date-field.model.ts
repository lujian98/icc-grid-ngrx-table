import { IccBaseField } from '../../models/base-field.model';

export interface IccDateFieldConfig extends IccBaseField {
  selectedLabel?: string;
  dateFormat: string;
  excludeWeekends: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
}

export const defaultDateFieldConfig: IccDateFieldConfig = {
  fieldType: 'date',
  fieldName: 'datefield',
  placeholder: 'ICC.UI.DATE.PICKER.SELECT_DATE',
  clearValue: true,

  selectedLabel: 'ICC.UI.DATE.PICKER.SELECTED_DATE',
  dateFormat: 'mediumDate',
  excludeWeekends: false,
  minDate: null,
  maxDate: null,
};

export interface IccDatePresetItem {
  label: string;
  date: Date;
}

export const presetDateSelectionConfig = {
  fieldName: 'preset',
  fieldLabel: 'ICC.UI.DATE.PICKER.SELECT_DATE',
  labelWidth: 60,
  optionLabel: 'label',
  optionKey: 'date',
  clearValue: false,
};

const backDate = (numOfDays: number) => {
  const day = new Date();
  return new Date(day.setDate(day.getDate() - numOfDays));
};

function get1stDayOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 0);
  return new Date(date.getFullYear(), date.getMonth(), diff);
}

const today = new Date();
const yesterday = backDate(1);
const minus7 = backDate(7);
const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);

export const iccDefaultDatePresets = [
  { label: 'Today', date: today },
  { label: 'Yesterday', date: yesterday },
  { label: '7 Days Ago', date: minus7 },
  { label: 'This Week', date: get1stDayOfWeek(today) },
  { label: 'Last Week', date: get1stDayOfWeek(minus7) },
  { label: 'This Month', date: currMonthStart },
  { label: 'Last Month', date: lastMonthStart },
];
