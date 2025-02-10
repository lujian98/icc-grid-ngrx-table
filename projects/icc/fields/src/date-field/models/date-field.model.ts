import { IccBaseField } from '../../models/base-field.model';

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
  placeholder: 'ICC.UI.DATE.PICKER.SELECT_DATE',
  clearValue: true,

  selectedLabel: 'ICC.UI.DATE.PICKER.SELECTED_DATE',
  dateFormat: 'mediumDate',
  excludeWeekends: false,
  minDate: null,
  maxDate: null,
};
