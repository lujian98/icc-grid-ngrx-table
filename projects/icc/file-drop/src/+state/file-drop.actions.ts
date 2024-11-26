import { createAction, props } from '@ngrx/store';
import { IccFileDropUpload } from '../models/file-drop-upload.model';

export const dropUploadFile = createAction('[File Drop] Drop Upload File', props<{ file: IccFileDropUpload }>());

export const uploadFiles = createAction('[File Drop] Upload Files', props<{ urlKey: string }>());

export const uploadFilesSuccess = createAction('[File Drop] Upload Files Success');

export const clearUploadFiles = createAction('[File Drop] Clear Upload Files');
