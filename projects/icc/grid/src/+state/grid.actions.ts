import { createAction, props } from '@ngrx/store';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridData,
  IccSortField,
  IccColumnFilter,
  IccRowGroupField,
  IccCellEdit,
} from '../models/grid-column.model';
import { IccRowGroup } from '../services/row-group/row-group';

export const initGridConfig = createAction(
  '[Grid] Init Grid Config',
  props<{ gridId: string; gridConfig: IccGridConfig }>(),
);

export const loadGridConfig = createAction(
  '[Grid] Load Grid Config',
  props<{ gridId: string; gridConfig: IccGridConfig }>(),
);

export const loadGridConfigSuccess = createAction(
  '[Grid] Load Grid Config Success',
  props<{ gridId: string; gridConfig: IccGridConfig }>(),
);

export const loadGridColumnsConfig = createAction('[Grid] Load Grid Columns Config', props<{ gridId: string }>());

export const loadGridColumnsConfigSuccess = createAction(
  '[Grid] Load Grid Columns Config Success',
  props<{ gridId: string; gridConfig: IccGridConfig; columnsConfig: IccColumnConfig[] }>(),
);

export const setViewportPageSize = createAction(
  '[Grid] Setup Grid Viewport Page Size',
  props<{ gridId: string; gridConfig: IccGridConfig; pageSize: number; viewportWidth: number }>(),
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

export const getGridData = createAction('[Grid] Get Grid Data', props<{ gridId: string }>());

export const getConcatGridData = createAction('[Grid] Get Concat Grid Data', props<{ gridId: string }>());

export const getGridDataSuccess = createAction(
  '[Grid] Get Grid Data Success',
  props<{ gridConfig: IccGridConfig; gridData: IccGridData<object> }>(),
);

export const setGridInMemoryData = createAction(
  '[Grid] Get Grid In Memory Data',
  props<{ gridConfig: IccGridConfig; gridData: IccGridData<object> }>(),
);

export const setSelectAllRows = createAction(
  '[Grid] Setup Grid Set Select or Unselect All Rows',
  props<{ gridConfig: IccGridConfig; selectAll: boolean }>(),
);

export const setSelectRows = createAction(
  '[Grid] Setup Grid Set Select or Unselect Rows',
  props<{ gridConfig: IccGridConfig; records: object[]; select: boolean }>(),
);

export const setSelectRow = createAction(
  '[Grid] Setup Grid Set Select a Row and clear all other rows',
  props<{ gridConfig: IccGridConfig; record: object }>(),
);

export const setGridGroupBy = createAction(
  '[Grid] Setup Grid Group By a Column',
  props<{ gridConfig: IccGridConfig; rowGroupField: IccRowGroupField }>(),
);

export const setToggleRowGroup = createAction(
  '[Grid] Setup Grid Toggle Row Group',
  props<{ gridConfig: IccGridConfig; rowGroup: IccRowGroup }>(),
);

export const setGridUnGroupBy = createAction(
  '[Grid] Setup Grid UnGroup By a Column',
  props<{ gridConfig: IccGridConfig }>(),
);

export const setGridEditable = createAction(
  '[Grid] Setup Grid Set Grid Editable',
  props<{ gridConfig: IccGridConfig; gridEditable: boolean }>(),
);

export const setGridRecordModified = createAction(
  '[Grid] Setup Grid Set Grid Record Modified',
  props<{ gridConfig: IccGridConfig; modified: IccCellEdit<unknown> }>(),
);

export const saveGridModifiedRecords = createAction(
  '[Grid] Save Grid Modified Record',
  props<{ gridConfig: IccGridConfig }>(),
);

//TODO save return data or refresh data???
export const saveModifiedRecordsSuccess = createAction(
  '[Grid] Save Grid Modified Record Success',
  props<{ gridConfig: IccGridConfig; newRecords: { [key: string]: unknown }[] }>(),
);

export const setGridRestEdit = createAction(
  '[Grid] Setup Grid Set Rest Edit',
  props<{ gridConfig: IccGridConfig; restEdit: boolean }>(),
);

export const clearGridDataStore = createAction('[Grid] Clear Grid Data Store', props<{ gridId: string }>());
export const removeGridDataStore = createAction('[Grid] Remove Grid Data Store', props<{ gridId: string }>());
