import { createAction, props } from '@ngrx/store';
import { IccGridConfig, IccColumnConfig, IccGridData, IccSortField } from '../models/grid-column.model';

export const setupGridConfig = createAction(
  '[Grid] Setup Grid Config',
  props<{ gridConfig: IccGridConfig }>()
);

export const setupGridConfigSuccess = createAction(
  '[Grid] Setup Grid Config Success',
  props<{ gridName: string, gridConfig: IccGridConfig }>()
);

export const setupGridColumnConfig = createAction(
  '[Grid] Setup Grid Column Config',
  props<{ gridName: string, columnConfig: IccColumnConfig[] }>()
);

export const setupGridColumnConfigSuccess = createAction(
  '[Grid] Setup Grid Column Config Success',
  props<{ gridName: string, columnConfig: IccColumnConfig[] }>()
);

export const setViewportPageSize = createAction(
  '[Grid] Setup Grid Viewport Page Size',
  props<{ gridName: string, pageSize: number }>()
);

export const setViewportPage = createAction(
  '[Grid] Setup Grid Viewport Page',
  props<{ gridName: string, page: number }>()
);

export const setGridSortField = createAction(
  '[Grid] Set Grid Sort Field',
  props<{ gridName: string, sortFields: IccSortField[] }>()
);

export const setGridColumnHiddenShow = createAction(
  '[Grid] Setup Grid Column Hidden Show',
  props<{ gridName: string, columnConfig: IccColumnConfig }>()
);


export const getGridData = createAction(
  '[Grid] Get Grid Data',
  props<{gridName: string}>()
);

export const getGridDataSuccess = createAction(
  '[Grid] Get Grid Data Success',
  props<{gridName: string, gridData: IccGridData<any>}>()
);
