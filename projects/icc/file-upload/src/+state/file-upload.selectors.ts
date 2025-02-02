import { IccGridData } from '@icc/ui/grid';
import { createSelector } from '@ngrx/store';
import { FileUploadState, iccFileUploadFeature } from './file-upload.reducer';
import { IccFileUpload } from '../models/file-upload.model';

export const { selectIccFileUploadState, selectUploadFiles } = iccFileUploadFeature;

export const selectUploadFilesGridData = createSelector(selectIccFileUploadState, (state: FileUploadState) => {
  const gridData: IccGridData<IccFileUpload> = {
    data: state.uploadFiles,
    totalCounts: state.uploadFiles.length,
  };
  return gridData;
});
