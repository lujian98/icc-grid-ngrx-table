import { IccGridData } from '@icc/ui/grid';
import { createSelector } from '@ngrx/store';
import { FileUploadState, iccFileUploadFeature } from './file-upload.reducer';

export const { selectIccFileUploadState, selectUploadFiles } = iccFileUploadFeature;

export const selectUploadFilesGridData = createSelector(selectIccFileUploadState, (state: FileUploadState) => {
  const gridData: IccGridData<any> = {
    data: state.uploadFiles,
    totalCounts: state.uploadFiles.length,
  };
  return gridData;
});
