import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccPasswordFieldConfig extends IccBaseField {
  minLength?: number;
  maxLength?: number;
}

export const defaultPasswordFieldConfig: IccPasswordFieldConfig = {
  fieldType: IccFieldType.Password,
  fieldName: 'passwordfield',
  ...defaultBaseField,
};
