import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IccResizeInfo } from '@icc/ui/resize';
import { createAction, props } from '@ngrx/store';
import { IccDashboardConfig, IccTile } from '../models/dashboard.model';

export const initDashboardConfig = createAction(
  '[Dashboard] Init Dashboard Config',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadRemoteDashboardConfig = createAction(
  '[Dashboard] Load Remote Dashboard Config',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardConfigSuccess = createAction(
  '[Dashboard] Load Dashboard Config Success',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardTiles = createAction(
  '[Dashboard] Load Dashboard Tiles',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardTilesSuccess = createAction(
  '[Dashboard] Load Dashboard Tiles Success',
  props<{ dashboardId: string; tiles: IccTile<unknown>[] }>(),
);

export const setGridViewport = createAction(
  '[Dashboard] Set Grid Viewport',
  props<{ dashboardId: string; width: number; height: number }>(),
);

export const setResizeTile = createAction(
  '[Dashboard] Set Resize Tile',
  props<{ dashboardId: string; resizeInfo: IccResizeInfo; tile: IccTile<unknown> }>(),
);

export const setDragDropTile = createAction(
  '[Dashboard] Set Drag Drop Tile',
  props<{ dashboardId: string; e: CdkDragDrop<unknown>; tile: IccTile<unknown> }>(),
);

export const clearDashboardStore = createAction('[Dashboard]] Clear Dashboard Store', props<{ dashboardId: string }>());
export const removeDashboardStore = createAction(
  '[Dashboard]] Remove Dashboard Store',
  props<{ dashboardId: string }>(),
);
