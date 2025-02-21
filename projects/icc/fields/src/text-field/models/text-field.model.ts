import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccTextFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultTextFieldConfig: IccTextFieldConfig = {
  fieldType: IccFieldType.Text,
  fieldName: 'textfield',
  ...defaultBaseField,
};
