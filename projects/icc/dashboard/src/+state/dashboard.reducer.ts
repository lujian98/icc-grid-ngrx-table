import { ActionReducer, createReducer, on } from '@ngrx/store';
import { defaultDashboardState, IccDashboardState } from '../models/dashboard.model';
import { viewportConfig, viewportSetting } from '../utils/viewport-setting';
import * as dashboardActions from './dashboard.actions';

export const initialState: IccDashboardState = defaultDashboardState;

export const iccDashboardReducer: ActionReducer<IccDashboardState> = createReducer(
  initialState,
  on(dashboardActions.initDashboardConfig, (state, action) => {
    const dashboardConfig = { ...action.dashboardConfig };
    const setting = {
      ...state.dashboardSetting,
      viewportReady: !dashboardConfig.remoteConfig,
    };
    return {
      ...state,
      dashboardConfig,
      dashboardSetting: viewportSetting(dashboardConfig, setting),
    };
  }),
  on(dashboardActions.loadDashboardConfigSuccess, (state, action) => {
    //remove this to use one of this
    const dashboardConfig = { ...action.dashboardConfig };
    const setting = {
      ...state.dashboardSetting,
      viewportReady: true,
    };
    return {
      ...state,
      dashboardConfig,
      dashboardSetting: viewportSetting(dashboardConfig, setting),
    };
  }),
  on(dashboardActions.loadDashboardOptions, (state, action) => {
    return {
      ...state,
      dashboardSetting: {
        ...state.dashboardSetting,
        viewportReady: true,
      },
      options: [...action.options],
    };
  }),
  on(dashboardActions.loadDashboardTilesSuccess, (state, action) => {
    return {
      ...state,
      dashboardSetting: {
        ...state.dashboardSetting,
        viewportReady: true,
      },
      tiles: [...action.tiles],
    };
  }),

  on(dashboardActions.setGridViewport, (state, action) => {
    const dashboardConfig = viewportConfig(state.dashboardConfig, action.width, action.height);
    return {
      ...state,
      dashboardConfig,
      dashboardSetting: viewportSetting(dashboardConfig, state.dashboardSetting),
    };
  }),

  on(dashboardActions.loadDashboardGridMapTiles, (state, action) => {
    return {
      ...state,
      dashboardSetting: {
        ...state.dashboardSetting,
        gridMap: action.gridMap,
      },
      tiles: action.tiles,
    };
  }),

  /*
  on(dashboardActions.removeDashboardStore, (state, action) => {
    const key = action.dashboardId;
    const newState: DashboardState = { ...state };
    if (state[key]) {
      delete newState[key];
    }
    return { ...newState };
  }),
  */
);
