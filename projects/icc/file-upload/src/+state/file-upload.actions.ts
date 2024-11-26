import { createAction, props } from '@ngrx/store';
import { IccFileUpload } from '../models/file-upload.model';

export const dropUploadFile = createAction('[File Upload] Drop Upload File', props<{ file: IccFileUpload }>());

export const uploadFiles = createAction('[File Upload] Upload Files', props<{ urlKey: string }>());

export const uploadFilesSuccess = createAction('[File Upload] Upload Files Success');

export const clearUploadFiles = createAction('[File Upload] Clear Upload Files');
