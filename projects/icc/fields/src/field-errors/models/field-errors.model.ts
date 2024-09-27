import { IccBaseField } from '../../models/base-field.model';

export interface IccFieldErrorFieldConfig extends IccBaseField {}

export const defaultFieldErrorFieldConfig: IccFieldErrorFieldConfig = {
  fieldType: 'fielderror',
  fieldName: 'fielderrorfield',
  placeholder: '',
  clearValue: true,
};
