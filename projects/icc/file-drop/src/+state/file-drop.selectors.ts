import { createSelector } from '@ngrx/store';
import { FileDropState, iccFileDropFeature } from './file-drop.reducer';

export const { selectIccFileDropState, selectUploadFiles } = iccFileDropFeature;
