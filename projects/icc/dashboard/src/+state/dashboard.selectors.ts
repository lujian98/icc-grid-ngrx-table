import { createSelector } from '@ngrx/store';
import { DashboardState, defaultDashboardState } from '../models/dashboard.model';

export interface AppDashboardState {
  [key: string]: DashboardState;
}

const featureSelector = (state: AppTabsState) => state.iccTabs;

export const selectDashboardSetting = (dashboardId: string, featureName: string) =>
  createSelector(
    (state: AppDashboardState) => state[featureName],
    (state: DashboardState) => {
      const dashboardSetting = state && state[dashboardId] ? state[dashboardId].dashboardSetting : undefined;
      return dashboardSetting && dashboardSetting.viewportReady
        ? dashboardSetting
        : defaultDashboardState.dashboardSetting;
    },
  );

export const selectDashboardConfig = (dashboardId: string, featureName: string) =>
  createSelector(
    (state: AppDashboardState) => state[featureName],
    (state: DashboardState) => {
      const dashboardConfig = state && state[dashboardId] ? state[dashboardId].dashboardConfig : undefined;
      return dashboardConfig && state[dashboardId].dashboardSetting.viewportReady
        ? dashboardConfig
        : defaultDashboardState.dashboardConfig;
    },
  );

export const selectDashboardTiles = (dashboardId: string, featureName: string) =>
  createSelector(
    (state: AppDashboardState) => state[featureName],
    (state: DashboardState) => {
      return state && state[dashboardId] ? state[dashboardId].tiles : [];
    },
  );
