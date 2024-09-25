import { IccBaseField } from '../../models/base-field.model';

export interface IccHiddenFieldConfig extends IccBaseField {}

export const defaultHiddenFieldConfig: IccHiddenFieldConfig = {
  fieldType: 'hidden',
  fieldName: 'hiddenfield',
};
