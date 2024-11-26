import { IccUploadFile } from '@icc/ui/core';

export interface IccFileUpload extends IccUploadFile {
  filename: string;
  type: string;
  size: number;
  lastModified: number;
}
