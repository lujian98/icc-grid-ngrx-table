import { IccBaseField } from '../../models/base-field.model';

export interface IccTextareaFieldConfig extends IccBaseField {}

export const defaultTextareaFieldConfig: IccTextareaFieldConfig = {
  fieldType: 'textarea',
  fieldName: 'textareafield',
  placeholder: '',
  clearValue: true,
  labelWidth: 100,
};
