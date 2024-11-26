import { IccUploadFile } from '@icc/ui/core';

export interface IccFileDropUpload extends IccUploadFile {
  filename: string;
  type: string;
  size: number;
  lastModified: number;
}
