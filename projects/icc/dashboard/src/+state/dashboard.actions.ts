import { createAction, props } from '@ngrx/store';
import { IccDashboardConfig, IccTile, IccTileOption } from '../models/dashboard.model';

export const initDashboardConfig = createAction(
  '[Dashboard] Init Dashboard Config',
  props<{ dashboardConfig: IccDashboardConfig }>(),
);

export const loadRemoteDashboardConfig = createAction(
  '[Dashboard] Load Remote Dashboard Config',
  props<{ dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardConfigSuccess = createAction(
  '[Dashboard] Load Dashboard Config Success',
  props<{ dashboardConfig: IccDashboardConfig }>(),
);

export const setGridViewport = createAction(
  '[Dashboard] Set Grid Viewport',
  props<{ width: number; height: number }>(),
);

export const loadDashboardOptions = createAction(
  '[Dashboard] Load Tab Options',
  props<{ options: IccTileOption<unknown>[] }>(),
);

export const loadDashboardTiles = createAction(
  '[Dashboard] Load Dashboard Tiles',
  props<{ dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardTilesSuccess = createAction(
  '[Dashboard] Load Dashboard Tiles Success',
  props<{ tiles: IccTile<unknown>[] }>(),
);

export const loadDashboardGridMapTiles = createAction(
  '[Dashboard] Load Dashboard Grid Map and Tiles',
  props<{ gridMap: number[][]; tiles: IccTile<unknown>[] }>(),
);

export const removeDashboardStore = createAction(
  '[Dashboard] Remove Dashboard Store',
  props<{ featureName: string }>(),
);
export const removeDashboardStoreComplete = createAction(
  '[Dashboard]] Remove Dashboard Store Complete',
  props<{ featureName: string }>(),
);
