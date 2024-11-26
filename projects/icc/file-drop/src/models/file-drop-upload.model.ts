import { IccUploadFile } from '@icc/ui/core';

export interface IccFileDropUpload extends IccUploadFile {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}
