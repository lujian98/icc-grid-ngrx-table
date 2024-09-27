import { IccBaseField } from '../../models/base-field.model';

export interface IccUploadFileFieldConfig extends IccBaseField {}

export const defaultUploadFileFieldConfig: IccUploadFileFieldConfig = {
  fieldType: 'uploadfile',
  fieldName: 'uploadfilefield',
  placeholder: 'Select file to upload ...',
};
