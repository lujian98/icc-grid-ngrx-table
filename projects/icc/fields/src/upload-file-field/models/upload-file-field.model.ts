import { IccBaseField } from '../../models/base-field.model';

export interface IccUploadFileFieldConfig extends IccBaseField {}

export const defaultUploadFileFieldConfig: IccUploadFileFieldConfig = {
  fieldType: 'uploadfile',
  fieldName: 'uploadfilefield',
  clearValue: true,
};
