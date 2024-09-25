import { IccBaseField } from '../../models/base-field.model';

export interface IccDisplayFieldConfig extends IccBaseField {}

export const defaultDisplayFieldConfig: IccDisplayFieldConfig = {
  fieldType: 'display',
  fieldName: 'displayfield',
};
