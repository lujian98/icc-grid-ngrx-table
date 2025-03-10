import { IccMenuConfig } from '@icc/ui/menu';
import { createAction, props } from '@ngrx/store';
import { IccTile, IccDashboardConfig } from '../models/dashboard.model';

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

export const loadDashboardDashboard = createAction(
  '[Dashboard] Load Dashboard Dashboard',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Dashboard Success',
  props<{ dashboardId: string; dashboard: IccTile<unknown>[] }>(),
);

export const loadDashboardOptions = createAction(
  '[Dashboard] Load Tile Options',
  props<{ dashboardId: string; dashboardConfig: IccDashboardConfig }>(),
);

export const loadDashboardOptionsSuccess = createAction(
  '[Dashboard] Load Tile Options Success',
  props<{ dashboardId: string; options: IccTile<unknown>[] }>(),
);

export const setAddTile = createAction(
  '[Dashboard] Set Add Tile',
  props<{ dashboardId: string; tile: IccTile<unknown> }>(),
);

export const setDragDropTile = createAction(
  '[Dashboard] Set Drag Drop Tile',
  props<{ dashboardId: string; previousIndex: number; currentIndex: number }>(),
);

export const setSelectedIndex = createAction(
  '[Dashboard] Set Selected Index',
  props<{ dashboardId: string; index: number }>(),
);

export const setContextMenuClicked = createAction(
  '[Dashboard] Set Context Menu Clicked',
  props<{ dashboardId: string; menuItem: IccMenuConfig; tile: IccTile<unknown>; index: number }>(),
);

export const setCloseTile = createAction(
  '[Dashboard] Set Close Tile',
  props<{ dashboardId: string; tile: IccTile<unknown> }>(),
);

export const clearDashboardStore = createAction('[Dashboard]] Clear Dashboard Store', props<{ dashboardId: string }>());
export const removeDashboardStore = createAction(
  '[Dashboard]] Remove Dashboard Store',
  props<{ dashboardId: string }>(),
);
