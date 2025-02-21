import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccDisplayFieldConfig extends IccBaseField {}

export const defaultDisplayFieldConfig: IccDisplayFieldConfig = {
  fieldType: IccObjectType.Display,
  fieldName: 'displayfield',
  ...defaultBaseField,
  editButtons: [],
};
