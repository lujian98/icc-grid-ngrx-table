import { createSelector } from '@ngrx/store';
import { DashboardState, defaultDashboardState } from '../models/dashboard.model';

export interface AppDashboardState {
  iccDashboard: DashboardState;
}

export const featureSelector = (state: AppDashboardState) => state.iccDashboard;

export const selectDashboardSetting = (dashboardId: string) =>
  createSelector(featureSelector, (state: DashboardState) => {
    const dashboardSetting = state && state[dashboardId] ? state[dashboardId].dashboardSetting : undefined;
    return dashboardSetting && dashboardSetting.viewportReady
      ? dashboardSetting
      : defaultDashboardState.dashboardSetting;
  });

export const selectDashboardConfig = (dashboardId: string) =>
  createSelector(featureSelector, (state: DashboardState) => {
    const dashboardConfig = state && state[dashboardId] ? state[dashboardId].dashboardConfig : undefined;
    return dashboardConfig && state[dashboardId].dashboardSetting.viewportReady
      ? dashboardConfig
      : defaultDashboardState.dashboardConfig;
  });

export const selectDashboardDashboard = (dashboardId: string) =>
  createSelector(featureSelector, (state: DashboardState) => {
    return state && state[dashboardId] ? state[dashboardId].dashboard : [];
  });

export const selectDashboardOptions = (dashboardId: string) =>
  createSelector(featureSelector, (state: DashboardState) => {
    return state && state[dashboardId] ? state[dashboardId].options : [];
  });
