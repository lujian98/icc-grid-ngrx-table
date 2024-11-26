import { IccFileUpload } from '../models/file-upload.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as fileUploadActions from './file-upload.actions';

export interface FileUploadState {
  uploadFiles: IccFileUpload[];
}

export const initialState: FileUploadState = {
  uploadFiles: [],
};

export const iccFileUploadFeature = createFeature({
  name: 'iccFileUpload',
  reducer: createReducer(
    initialState,
    on(fileUploadActions.dropUploadFile, (state, { file }) => {
      return {
        ...state,
        uploadFiles: [
          ...state.uploadFiles,
          {
            ...file,
            fieldName: `fileupload_${state.uploadFiles.length + 1}`,
          },
        ],
      };
    }),
    on(fileUploadActions.uploadFilesSuccess, fileUploadActions.clearUploadFiles, (state) => ({
      ...state,
      uploadFiles: [],
    })),
  ),
});
