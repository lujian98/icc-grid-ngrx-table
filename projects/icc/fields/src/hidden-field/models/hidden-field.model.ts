import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccHiddenFieldConfig extends IccBaseField {}

export const defaultHiddenFieldConfig: IccHiddenFieldConfig = {
  fieldType: IccObjectType.Hidden,
  fieldName: 'hiddenfield',
  ...defaultBaseField,
  editButtons: [],
};
