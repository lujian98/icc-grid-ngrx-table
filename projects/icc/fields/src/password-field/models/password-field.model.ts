import { IccBaseField } from '../../models/base-field.model';

export interface IccPasswordFieldConfig extends IccBaseField {}

export const defaultPasswordFieldConfig: IccPasswordFieldConfig = {
  fieldType: 'password',
  fieldName: 'passwordfield',
  placeholder: '',
  clearValue: true,
};
