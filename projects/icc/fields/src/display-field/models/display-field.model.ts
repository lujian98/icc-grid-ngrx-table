import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccDisplayFieldConfig extends IccBaseField {}

export const defaultDisplayFieldConfig: IccDisplayFieldConfig = {
  fieldType: IccFieldType.Display,
  fieldName: 'displayfield',
  ...defaultBaseField,
  editButtons: [],
};
