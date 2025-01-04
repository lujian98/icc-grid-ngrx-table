import { createAction, props } from '@ngrx/store';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridData,
  IccSortField,
  IccColumnFilter,
} from '../models/grid-column.model';

export const initGridConfig = createAction('[Grid] Init Grid Config', props<{ gridConfig: IccGridConfig }>());

export const loadGridConfig = createAction('[Grid] Load Grid Config', props<{ gridConfig: IccGridConfig }>());

export const loadGridConfigSuccess = createAction(
  '[Grid] Load Grid Config Success',
  props<{ gridConfig: IccGridConfig }>(),
);

export const loadGridColumnsConfig = createAction(
  '[Grid] Load Grid Columns Config',
  props<{ gridConfig: IccGridConfig }>(),
);

export const loadGridColumnsConfigSuccess = createAction(
  '[Grid] Load Grid Columns Config Success',
  props<{ gridConfig: IccGridConfig; columnsConfig: IccColumnConfig[] }>(),
);

export const setViewportPageSize = createAction(
  '[Grid] Setup Grid Viewport Page Size',
  props<{ gridConfig: IccGridConfig; pageSize: number; viewportWidth: number }>(),
);

export const setViewportPage = createAction(
  '[Grid] Setup Grid Viewport Page',
  props<{ gridConfig: IccGridConfig; page: number }>(),
);

export const setGridSortFields = createAction(
  '[Grid] Set Grid Sort Fields',
  props<{ gridConfig: IccGridConfig; sortFields: IccSortField[] }>(),
);

export const setGridColumnFilters = createAction(
  '[Grid] Set Grid Column Filters',
  props<{ gridConfig: IccGridConfig; columnFilters: IccColumnFilter[] }>(),
);

export const setGridColumnsConfig = createAction(
  '[Grid] Setup Grid Column Config',
  props<{ gridConfig: IccGridConfig; columnsConfig: IccColumnConfig }>(),
);

export const getGridData = createAction('[Grid] Get Grid Data', props<{ gridConfig: IccGridConfig }>());

export const getGridDataSuccess = createAction(
  '[Grid] Get Grid Data Success',
  props<{ gridConfig: IccGridConfig; gridData: IccGridData<any> }>(),
);

export const setGridInMemoryData = createAction(
  '[Grid] Get Grid In Memory Data',
  props<{ gridConfig: IccGridConfig; gridData: IccGridData<any> }>(),
);

export const setGridGroupBy = createAction(
  '[Grid] Setup Grid Group By a Column',
  props<{ gridConfig: IccGridConfig; columnsConfig: IccColumnConfig }>(),
);

export const setGridUnGroupBy = createAction(
  '[Grid] Setup Grid UnGroup By a Column',
  props<{ gridConfig: IccGridConfig }>(),
);

export const clearGridDataStore = createAction('[Grid] Clear Grid Data Store', props<{ gridId: string }>());
export const removeGridDataStore = createAction('[Grid] Remove Grid Data Store', props<{ gridId: string }>());
