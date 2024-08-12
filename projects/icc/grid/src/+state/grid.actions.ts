import { createAction, props } from '@ngrx/store';
import { IccColumnConfig } from '../models/grid-column.model';

export const setupGridConfig = createAction(
  '[Grid] Setup Grid Config',
  props<{ gridName: string }>()
);

export const setupGridColumnConfig = createAction(
  '[Grid] Setup Grid Column Config',
  props<{ gridName: string, columnConfig: IccColumnConfig[] }>()
);

