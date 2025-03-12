import { createAction, props } from '@ngrx/store';
import { IccDashboardConfig, IccTile, IccTileOption } from '../models/dashboard.model';

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

export const setGridViewport = createAction(
  '[Dashboard] Set Grid Viewport',
  props<{ dashboardId: string; width: number; height: number }>(),
);

export const loadDashboardOptions = createAction(
  '[Dashboard] Load Tab Options',
  props<{ dashboardId: string; options: IccTileOption<unknown>[] }>(),
);

export const loadDashboardTiles = createAction(
  '[Dashboard] Load Dashboard Tiles',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardTilesSuccess = createAction(
  '[Dashboard] Load Dashboard Tiles Success',
  props<{ dashboardId: string; tiles: IccTile<unknown>[] }>(),
);

export const loadDashboardGridMapTiles = createAction(
  '[Dashboard] Load Dashboard Grid Map and Tiles',
  props<{ dashboardId: string; gridMap: number[][]; tiles: IccTile<unknown>[] }>(),
);

export const clearDashboardStore = createAction('[Dashboard]] Clear Dashboard Store', props<{ dashboardId: string }>());
export const removeDashboardStore = createAction(
  '[Dashboard]] Remove Dashboard Store',
  props<{ dashboardId: string }>(),
);
