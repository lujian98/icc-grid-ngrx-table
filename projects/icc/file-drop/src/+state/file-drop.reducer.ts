import { IccFileDropUpload } from '../models/file-drop-upload.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as fileDropActions from './file-drop.actions';

export interface FileDropState {
  uploadFiles: IccFileDropUpload[];
}

export const initialState: FileDropState = {
  uploadFiles: [],
};

export const iccFileDropFeature = createFeature({
  name: 'iccFileDrop',
  reducer: createReducer(
    initialState,
    on(fileDropActions.dropUploadFile, (state, { file }) => {
      return {
        ...state,
        uploadFiles: [
          ...state.uploadFiles,
          {
            ...file,
            fieldName: `filedrop_${state.uploadFiles.length + 1}`,
          },
        ],
      };
    }),
    on(fileDropActions.uploadFilesSuccess, fileDropActions.clearUploadFiles, (state) => ({
      ...state,
      uploadFiles: [],
    })),
  ),
});
