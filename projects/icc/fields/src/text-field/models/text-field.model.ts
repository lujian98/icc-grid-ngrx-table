import { IccBaseField } from '../../models/base-field.model';

export interface IccTextFieldConfig extends IccBaseField {}

export const defaultTextFieldConfig: IccTextFieldConfig = {
  fieldType: 'text',
  fieldName: 'textfield',
  placeholder: '',
  clearValue: false,
  labelWidth: 100,
};
