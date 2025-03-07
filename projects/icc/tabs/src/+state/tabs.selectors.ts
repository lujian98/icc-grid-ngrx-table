import { createSelector } from '@ngrx/store';
import { TabsState } from '../models/tabs.model';

export interface AppTabsState {
  iccTabs: TabsState;
}

export const featureSelector = (state: AppTabsState) => state.iccTabs;

export const selectTabsSetting = (tabsId: string) =>
  createSelector(featureSelector, (state: TabsState) => {
    const tabsSetting = state && state[tabsId] ? state[tabsId].tabsSetting : undefined;
    return tabsSetting && tabsSetting.viewportReady ? tabsSetting : undefined;
  });

export const selectTabsConfig = (tabsId: string) =>
  createSelector(featureSelector, (state: TabsState) => {
    const tabsConfig = state && state[tabsId] ? state[tabsId].tabsConfig : undefined;
    return tabsConfig && state[tabsId].tabsSetting.viewportReady ? tabsConfig : undefined;
  });

export const selectTabsOptions = (tabsId: string) =>
  createSelector(featureSelector, (state: TabsState) => {
    return state && state[tabsId] ? state[tabsId].options : [];
  });
