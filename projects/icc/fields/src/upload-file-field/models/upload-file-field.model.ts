import { IccBaseField, defaultBaseField, IccFieldType } from '../../models/base-field.model';

export interface IccUploadFileFieldConfig extends IccBaseField {}

export const defaultUploadFileFieldConfig: IccUploadFileFieldConfig = {
  fieldType: IccFieldType.UploadFile,
  fieldName: 'uploadfilefield',
  ...defaultBaseField,
};
