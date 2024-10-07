import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccTextFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultTextFieldConfig: IccTextFieldConfig = {
  fieldType: 'text',
  fieldName: 'textfield',
  ...defaultBaseField,
};
