import { IccGridData } from '@icc/ui/grid';
import { createSelector } from '@ngrx/store';
import { FileDropState, iccFileDropFeature } from './file-drop.reducer';

export const { selectIccFileDropState, selectUploadFiles } = iccFileDropFeature;

export const selectUploadFilesGridData = createSelector(selectIccFileDropState, (state: FileDropState) => {
  const gridData: IccGridData<any> = {
    data: state.uploadFiles,
    totalCounts: state.uploadFiles.length,
  };
  return gridData;
});
