import { moveItemInArray } from '@angular/cdk/drag-drop';
import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultDashboardState, DashboardState } from '../models/dashboard.model';
import { contextClickedDashboard } from '../utils/context-clicked-dashboard';
import { getSelectedTabIndex } from '../utils/selected-tab-index';
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
      newState[key] = {
        ...defaultDashboardState,
        dashboardConfig,
        dashboardSetting: {
          ...defaultDashboardState.dashboardSetting,
          dashboardId: action.dashboardId,
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
            viewportReady: !dashboardConfig.remoteOptions,
          },
        };
      }
      return { ...newState };
    }),
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
    }),
    on(dashboardActions.loadDashboardDashboardSuccess, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          dashboardSetting: {
            ...state[key].dashboardSetting,
            viewportReady: true,
          },
          dashboard: [...action.dashboard],
        };
      }
      return { ...newState };
    }),
    on(dashboardActions.setSelectedIndex, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...state[key].dashboardConfig,
            selectedTabIndex: action.index,
          },
        };
      }
      return { ...newState };
    }),
    on(dashboardActions.setAddTab, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        let selectedTabIndex = oldState.dashboardConfig.selectedTabIndex;
        let dashboard = [...oldState.dashboard];
        const find = oldState.dashboard.findIndex((item) => item.name === action.tab.name);
        if (find === -1) {
          const tab = oldState.options.find((option) => option.name === action.tab.portalName);
          const newdashboard = [...oldState.dashboard];
          if (tab) {
            newdashboard.push({ ...tab, ...action.tab });
          } else {
            newdashboard.push({ ...action.tab });
          }
          dashboard = [...newdashboard];
          selectedTabIndex = dashboard.length - 1;
        } else {
          selectedTabIndex = find;
        }
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...state[key].dashboardConfig,
            selectedTabIndex,
          },
          dashboard,
        };
      }
      return { ...newState };
    }),
    on(dashboardActions.setDragDropTab, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const dashboard = oldState.dashboard;
        const prevActive = dashboard[oldState.dashboardConfig.selectedTabIndex];
        moveItemInArray(dashboard, action.previousIndex, action.currentIndex);
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...state[key].dashboardConfig,
            selectedTabIndex: dashboard.indexOf(prevActive),
          },
          dashboard,
        };
      }
      return { ...newState };
    }),
    on(dashboardActions.setContextMenuClicked, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const oldDashboard = oldState.dashboard;
        const prevActive = oldDashboard[oldState.dashboardConfig.selectedTabIndex];
        const dashboard = contextClickedDashboard(action.menuItem, oldDashboard, action.tab, action.index);
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...state[key].dashboardConfig,
            selectedTabIndex: getSelectedTabIndex(dashboard, prevActive),
          },
          dashboard,
        };
      }
      return { ...newState };
    }),
    on(dashboardActions.setCloseTab, (state, action) => {
      const key = action.dashboardId;
      const newState: DashboardState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const oldDashboard = oldState.dashboard;
        const prevActive = oldDashboard[oldState.dashboardConfig.selectedTabIndex];
        const dashboard = [...oldDashboard].filter((item) => item.name !== action.tab.name);
        newState[key] = {
          ...state[key],
          dashboardConfig: {
            ...state[key].dashboardConfig,
            selectedTabIndex: getSelectedTabIndex(dashboard, prevActive),
          },
          dashboard,
        };
      }
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
