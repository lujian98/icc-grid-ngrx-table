import { createAction, props } from '@ngrx/store';
import { IccGridConfig, IccColumnConfig } from '../models/grid-column.model';

export const setupGridConfig = createAction(
  '[Grid] Setup Grid Config',
  props<{ gridConfig: IccGridConfig }>()
);

export const setupGridColumnConfig = createAction(
  '[Grid] Setup Grid Column Config',
  props<{ gridName: string, columnConfig: IccColumnConfig[] }>()
);

