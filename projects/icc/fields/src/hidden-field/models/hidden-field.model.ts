import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccHiddenFieldConfig extends IccBaseField {}

export const defaultHiddenFieldConfig: IccHiddenFieldConfig = {
  fieldType: IccFieldType.Hidden,
  fieldName: 'hiddenfield',
  ...defaultBaseField,
  editButtons: [],
};
