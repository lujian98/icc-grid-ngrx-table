import { IccBaseField } from '@icc/ui/fields';

export interface IccDateFieldConfig extends IccBaseField {
  selectedLabel?: string; // -> prefixLabel
  dateFormat: string; // 'mediumDate'
  excludeWeekends: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
}

export const defaultDateFieldConfig: IccDateFieldConfig = {
  fieldType: 'date',
  fieldName: 'datefield',
  placeholder: 'ICC.UI.FIELDS.DATE.PLACEHOLDER',
  clearValue: true,

  selectedLabel: 'DATE_PICKER.SELECTED_DATE',
  dateFormat: 'mediumDate',
  excludeWeekends: false,
  minDate: null,
  maxDate: null,
};
