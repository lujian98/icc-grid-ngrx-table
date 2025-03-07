import { createFeature, createReducer, on } from '@ngrx/store';
import { TabsState, defaultTabsState } from '../models/tabs.model';
import * as tabsActions from './tabs.actions';

export const initialState: TabsState = {};

export const iccTabsFeature = createFeature({
  name: 'iccTabs',
  reducer: createReducer(
    initialState,
    on(tabsActions.initTabsConfig, (state, action) => {
      const tabsConfig = { ...action.tabsConfig };
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      newState[key] = {
        ...defaultTabsState,
        tabsConfig,
        tabsSetting: {
          ...defaultTabsState.tabsSetting,
          tabsId: action.tabsId,
          viewportReady: !tabsConfig.remoteConfig && !tabsConfig.remoteOptions,
        },
      };
      console.log(' newState=', newState);
      return { ...newState };
    }),
    on(tabsActions.loadTabsConfigSuccess, (state, action) => {
      const tabsConfig = { ...action.tabsConfig };
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          tabsConfig: {
            ...tabsConfig,
          },
          tabsSetting: {
            ...state[key].tabsSetting,
            viewportReady: !tabsConfig.remoteOptions,
          },
        };
      }
      console.log(' config newState=', newState);
      return { ...newState };
    }),
    on(tabsActions.loadTabsOptionsSuccess, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          tabsSetting: {
            ...state[key].tabsSetting,
            viewportReady: true,
          },
          options: [...action.options],
        };
      }
      console.log(' option newState=', newState);
      return { ...newState };
    }),
    on(tabsActions.loadTabsTabsSuccess, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          tabsSetting: {
            ...state[key].tabsSetting,
            viewportReady: true,
          },
          tabs: [...action.tabs],
        };
      }
      console.log(' tabs newState=', newState);
      return { ...newState };
    }),
    on(tabsActions.removeTabsStore, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        delete newState[key];
      }
      return { ...newState };
    }),
  ),
});
