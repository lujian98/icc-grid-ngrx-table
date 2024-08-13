import { createAction, props } from '@ngrx/store';
import { IccGridConfig, IccColumnConfig } from '../models/grid-column.model';

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
