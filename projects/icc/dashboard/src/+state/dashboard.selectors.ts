import { createSelector } from '@ngrx/store';
import { defaultDashboardState, IccDashboardState } from '../models/dashboard.model';

interface DashboardState {
  [key: string]: IccDashboardState;
}

const featureSelector = (featureName: string) =>
  createSelector(
    (state: DashboardState) => state[featureName],
    (state: IccDashboardState) => state,
  );

export const selectDashboardSetting = (featureName: string) =>
  createSelector(featureSelector(featureName), (state: IccDashboardState) => {
    const dashboardSetting = state ? state.dashboardSetting : undefined;
    return dashboardSetting && dashboardSetting.viewportReady
      ? dashboardSetting
      : defaultDashboardState.dashboardSetting;
  });

export const selectDashboardConfig = (featureName: string) =>
  createSelector(featureSelector(featureName), (state: IccDashboardState) => {
    const dashboardConfig = state ? state.dashboardConfig : undefined;
    return dashboardConfig && state.dashboardSetting.viewportReady
      ? dashboardConfig
      : defaultDashboardState.dashboardConfig;
  });

export const selectDashboardTiles = (featureName: string) =>
  createSelector(featureSelector(featureName), (state: IccDashboardState) => {
    return state && state ? state.tiles : [];
  });
