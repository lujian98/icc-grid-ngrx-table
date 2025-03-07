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
      return { ...newState };
    }),
    on(tabsActions.loadTabsOptionsSuccess, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        //const isObjectOptions = [...action.options].every((item) => typeof item === 'object');
        newState[key] = {
          ...state[key],
          tabsSetting: {
            ...state[key].tabsSetting,
            viewportReady: true,
            ///singleListOption: !isObjectOptions,
          },
          options: [...action.options],
        };
      }
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
