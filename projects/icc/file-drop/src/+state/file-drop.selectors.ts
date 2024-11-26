import { createSelector } from '@ngrx/store';
import { IccGridConfig, IccGridComponent, IccColumnConfig, defaultGridConfig, IccGridData } from '@icc/ui/grid';
import { FileDropState, iccFileDropFeature } from './file-drop.reducer';

export const { selectIccFileDropState, selectUploadFiles } = iccFileDropFeature;

export const selectUploadFilesGridData = createSelector(selectIccFileDropState, (state: FileDropState) => {
  console.log(' state=', state);
  const gridData: IccGridData<any> = {
    data: state.uploadFiles,
    totalCounts: state.uploadFiles.length,
  };
  return gridData;
});

/*
export interface IccGridData<T> {
  data: T[];
  totalCounts: number;
}

*/
