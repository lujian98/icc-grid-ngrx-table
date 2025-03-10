import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardState, defaultDashboardState } from '../models/dashboard.model';
import { dragDropTile } from '../utils/drag-drop-tile';
import { setTileLayouts } from '../utils/setup-tiles';
import { getTileResizeInfo } from '../utils/tile-resize-info';
import { getGridMap, getViewportSetting, gridViewportConfig } from '../utils/viewport-setting';
import * as dashboardActions from './dashboard.actions';

export const initialState: DashboardState = {};

export const iccDashboardFeature = createFeature({
  name: 'iccDashboard',
  reducer: createReducer(
    initialState,
    on(dashboardActions.initDashboardConfig, (state, action) => {
      const dashboardConfig = { ...action.dashboardConfig };
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      const setting = {
        ...defaultDashboardState.dashboardSetting,
        dashboardId: action.dashboardId,
        viewportReady: !dashboardConfig.remoteConfig && !dashboardConfig.remoteOptions,
      };
      newState[key] = {
        ...defaultDashboardState,
        dashboardConfig,
        dashboardSetting: getViewportSetting(dashboardConfig, setting),
      };
      return { ...newState };
    }),
    on(dashboardActions.loadDashboardConfigSuccess, (state, action) => {
      const dashboardConfig = { ...action.dashboardConfig };
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const setting = {
          ...state[key].dashboardSetting,
          viewportReady: !dashboardConfig.remoteOptions,
        };
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...dashboardConfig,
          },
          dashboardSetting: getViewportSetting(dashboardConfig, setting),
        };
      }
      return { ...newState };
    }),
    /*
    on(dashboardActions.loadDashboardOptionsSuccess, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          dashboardSetting: {
            ...state[key].dashboardSetting,
            viewportReady: true,
          },
          options: [...action.options],
        };
      }
      return { ...newState };
    }),*/
    on(dashboardActions.loadDashboardTilesSuccess, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const gridMap = getGridMap(oldState.dashboardConfig);
        const tiles = setTileLayouts(action.tiles, oldState.dashboardConfig, gridMap);
        newState[key] = {
          ...state[key],
          dashboardSetting: {
            ...state[key].dashboardSetting,
            gridMap,
            viewportReady: true,
          },
          tiles,
        };
      }
      //console.log(' new tiles state=', newState);
      return { ...newState };
    }),

    on(dashboardActions.setGridViewport, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const dashboardConfig = gridViewportConfig(oldState.dashboardConfig, action.width, action.height);
        newState[key] = {
          ...state[key],
          dashboardConfig,
          dashboardSetting: getViewportSetting(dashboardConfig, state[key].dashboardSetting),
        };
      }
      return { ...newState };
    }),

    on(dashboardActions.setResizeTile, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const gridMap = getGridMap(oldState.dashboardConfig);
        const tileInfo = getTileResizeInfo(action.resizeInfo, action.tile, oldState.dashboardConfig, gridMap);
        const resizedTiles = [...oldState.tiles].map((tile) => {
          return tile.name === action.tile.name ? { ...action.tile, ...tileInfo } : { ...tile };
        });
        const tiles = setTileLayouts(resizedTiles, oldState.dashboardConfig, gridMap);
        newState[key] = {
          ...state[key],
          dashboardSetting: {
            ...state[key].dashboardSetting,
            gridMap,
          },
          tiles,
        };
      }
      //console.log(' new tiles state=', newState);
      return { ...newState };
    }),
    on(dashboardActions.setDragDropTile, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const gridMap = getGridMap(oldState.dashboardConfig);
        const droppedTiles = dragDropTile(action.e, action.tile, oldState.tiles, oldState.dashboardConfig, gridMap);
        const tiles = setTileLayouts(droppedTiles, oldState.dashboardConfig, gridMap);
        newState[key] = {
          ...state[key],
          dashboardSetting: {
            ...state[key].dashboardSetting,
            gridMap,
          },
          tiles,
        };
      }
      //console.log(' new tiles state=', newState);
      return { ...newState };
    }),

    on(dashboardActions.removeDashboardStore, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
