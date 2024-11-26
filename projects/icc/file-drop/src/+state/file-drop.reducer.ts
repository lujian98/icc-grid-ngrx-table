import { IccUploadFile } from '@icc/ui/core';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as fileDropActions from './file-drop.actions';

export interface FileDropState {
  uploadFiles: IccUploadFile[];
}

export const initialState: FileDropState = {
  uploadFiles: [],
};

export const iccFileDropFeature = createFeature({
  name: 'iccFileDrop',
  reducer: createReducer(
    initialState,
    on(fileDropActions.dropUploadFile, (state, { file }) => ({
      ...state,
      uploadFiles: [...state.uploadFiles, file],
    })),
    on(fileDropActions.uploadFilesSuccess, fileDropActions.clearUploadFiles, (state) => ({
      ...state,
      uploadFiles: [],
    })),
  ),
});
