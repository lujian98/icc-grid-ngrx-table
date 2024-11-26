import { IccUploadFile } from '@icc/ui/core';

export interface IccFileUpload extends IccUploadFile {
  filename: string;
  type: string;
  size: number;
  lastModified: number;
}

export interface IccFileUploadConfig {
  urlKey: string;
  fileDir: string; // default to urlKey if not defined
  maxSelectUploads: number; // for file select upload only
}

export const defaultFileUploadConfig: IccFileUploadConfig = {
  urlKey: 'upload',
  fileDir: 'upload',
  maxSelectUploads: 5,
};
