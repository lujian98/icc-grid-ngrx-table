import { IccFileUpload } from '../models/file-upload.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as fileUploadActions from './file-upload.actions';

export interface FileUploadState {
  uploadFiles: IccFileUpload[];
}

export const initialState: FileUploadState = {
  uploadFiles: [],
};

export function getFileUpload(fieldName: string, file: File, relativePath: string): IccFileUpload {
  return {
    fieldName: fieldName,
    relativePath: relativePath,
    file: file,
    filename: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
  };
}

export const iccFileUploadFeature = createFeature({
  name: 'iccFileUpload',
  reducer: createReducer(
    initialState,
    on(fileUploadActions.dropUploadFile, (state, { relativePath, file }) => {
      const fieldName = `file_drop_upload_${state.uploadFiles.length + 1}`;
      return {
        ...state,
        uploadFiles: [...state.uploadFiles, getFileUpload(fieldName, file, relativePath)],
      };
    }),
    on(fileUploadActions.selectUploadFile, (state, { fieldName, file }) => {
      const uploadFiles = [...state.uploadFiles].filter((item) => item.fieldName !== fieldName);
      return {
        ...state,
        uploadFiles: [...uploadFiles, getFileUpload(fieldName, file, '')],
      };
    }),
    on(fileUploadActions.clearSelectUploadFile, (state, { fieldName }) => {
      return {
        ...state,
        uploadFiles: [...state.uploadFiles].filter((item) => item.fieldName !== fieldName),
      };
    }),
    on(fileUploadActions.uploadFilesSuccess, fileUploadActions.clearUploadFiles, (state) => ({
      ...state,
      uploadFiles: [],
    })),
  ),
});
