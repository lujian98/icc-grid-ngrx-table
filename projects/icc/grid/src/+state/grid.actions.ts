import { createAction, props } from '@ngrx/store';
import { IccColumnConfig, IccGridConfig, IccGridData, IccSortField } from '../models/grid-column.model';

export const setupGridConfig = createAction(
  '[Grid] Setup Grid Config',
  props<{ gridConfig: IccGridConfig }>()
);

export const setupGridConfigSuccess = createAction(
  '[Grid] Setup Grid Config Success',
  props<{ gridName: string, gridConfig: IccGridConfig }>()
);

export const setupGridColumnsConfig = createAction(
  '[Grid] Setup Grid Columns Config',
  props<{ gridName: string, columnConfig: IccColumnConfig[] }>()
);

export const setupGridColumnsConfigSuccess = createAction(
  '[Grid] Setup Grid Columns Config Success',
  props<{ gridName: string, columnConfig: IccColumnConfig[] }>()
);

export const setViewportPageSize = createAction(
  '[Grid] Setup Grid Viewport Page Size',
  props<{ gridName: string, pageSize: number, viewportWidth: number }>()
);

export const setViewportPage = createAction(
  '[Grid] Setup Grid Viewport Page',
  props<{ gridName: string, page: number }>()
);

export const setViewportScrollY = createAction(
  '[Grid] Setup Grid Viewport Page',
  props<{ gridName: string, hasScrollY: boolean }>()
);

export const setGridSortField = createAction(
  '[Grid] Set Grid Sort Field',
  props<{ gridName: string, sortFields: IccSortField[] }>()
);

export const setGridColumnConfig = createAction(
  '[Grid] Setup Grid Column Config',
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
