import { createAction, props } from '@ngrx/store';
import { IccFileUploadConfig } from '../models/file-upload.model';

export const dropUploadFile = createAction(
  '[File Upload] Drop Upload File',
  props<{ relativePath: string; file: File }>(),
);

export const uploadFiles = createAction(
  '[File Upload] Upload Files',
  props<{ fileUploadConfig: IccFileUploadConfig }>(),
);

export const uploadFilesSuccess = createAction('[File Upload] Upload Files Success');

export const clearUploadFiles = createAction('[File Upload] Clear Upload Files');

export const selectUploadFile = createAction(
  '[File Upload] Select Upload File',
  props<{ fieldName: string; file: File }>(),
);

export const clearSelectUploadFile = createAction(
  '[File Upload] Clear Select Upload File',
  props<{ fieldName: string }>(),
);
