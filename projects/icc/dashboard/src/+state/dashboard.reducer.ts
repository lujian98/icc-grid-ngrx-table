import { moveItemInArray } from '@angular/cdk/drag-drop';
import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultDashboardState, DashboardState, IccDashboardConfig } from '../models/dashboard.model';
//import { contextClickedDashboard } from '../utils/context-clicked-dashboard';
//import { getSelectedTabIndex } from '../utils/selected-tab-index';
import * as dashboardActions from './dashboard.actions';
import { dragDropTile } from '../utils/drag-drop-tile';
import { setTileLayouts } from '../utils/setup-tiles';
import { getTileResizeInfo } from '../utils/tile-resize-info';

export function getGridMap(config: IccDashboardConfig): number[][] {
  const gridMap: number[][] = [];

  for (let i = 0; i < config.rows; i++) {
    gridMap[i] = [];
    for (let j = 0; j < config.cols; j++) {
      gridMap[i][j] = -1;
    }
  }
  return gridMap;
  //this.tiles = setTileLayouts(this.tiles, this.config, this.gridMap);
  //window.dispatchEvent(new Event('resize'));
}

export const initialState: DashboardState = {};

export const iccDashboardFeature = createFeature({
  name: 'iccDashboard',
  reducer: createReducer(
    initialState,
    on(dashboardActions.initDashboardConfig, (state, action) => {
      const dashboardConfig = { ...action.dashboardConfig };
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      newState[key] = {
        ...defaultDashboardState,
        dashboardConfig,
        dashboardSetting: {
          ...defaultDashboardState.dashboardSetting,
          dashboardId: action.dashboardId,
          gridMap: getGridMap(dashboardConfig),
          gridTemplateColumns: `repeat(${dashboardConfig.cols}, ${dashboardConfig.gridWidth}px)`,
          gridTemplateRows: `repeat(${dashboardConfig.rows}, ${dashboardConfig.gridHeight}px)`,
          viewportReady: !dashboardConfig.remoteConfig && !dashboardConfig.remoteOptions,
        },
      };
      return { ...newState };
    }),
    on(dashboardActions.loadDashboardConfigSuccess, (state, action) => {
      const dashboardConfig = { ...action.dashboardConfig };
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...dashboardConfig,
          },
          dashboardSetting: {
            ...state[key].dashboardSetting,
            gridMap: getGridMap(dashboardConfig),
            gridTemplateColumns: `repeat(${dashboardConfig.cols}, ${dashboardConfig.gridWidth}px)`,
            gridTemplateRows: `repeat(${dashboardConfig.rows}, ${dashboardConfig.gridHeight}px)`,
            viewportReady: !dashboardConfig.remoteOptions,
          },
        };
      }
      console.log(' cccccccccccccc new tiles state=', newState);
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
      console.log(' new tiles state=', newState);
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
      console.log(' new tiles state=', newState);
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
      console.log(' new tiles state=', newState);
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
