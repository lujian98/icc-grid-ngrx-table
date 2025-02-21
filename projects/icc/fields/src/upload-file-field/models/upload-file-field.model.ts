import { IccObjectType } from '@icc/ui/core';
import { IccBaseField, defaultBaseField } from '../../models/base-field.model';

export interface IccUploadFileFieldConfig extends IccBaseField {}

export const defaultUploadFileFieldConfig: IccUploadFileFieldConfig = {
  fieldType: IccObjectType.UploadFile,
  fieldName: 'uploadfilefield',
  ...defaultBaseField,
};
