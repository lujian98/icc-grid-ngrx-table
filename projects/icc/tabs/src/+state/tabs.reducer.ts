import { moveItemInArray } from '@angular/cdk/drag-drop';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TabsState, defaultTabsState, IccTabMenuConfig } from '../models/tabs.model';
import * as tabsActions from './tabs.actions';

export const initialState: TabsState = {};

export const iccTabsFeature = createFeature({
  name: 'iccTabs',
  reducer: createReducer(
    initialState,
    on(tabsActions.initTabsConfig, (state, action) => {
      //console.log(' 0000000000000000000000000=');
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
    on(tabsActions.setSelectedIndex, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        newState[key] = {
          ...state[key],
          tabsConfig: {
            ...state[key].tabsConfig,
            selectedTabIndex: action.index,
          },
        };
      }
      //console.log(' setSelectedIndex newState=', newState);
      return { ...newState };
    }),
    on(tabsActions.setAddTab, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        let selectedTabIndex = oldState.tabsConfig.selectedTabIndex;
        let tabs = [...oldState.tabs];
        const find = oldState.tabs.findIndex((item) => item.name === action.tab.name);
        if (find === -1) {
          const tab = oldState.options.find((option) => option.name === (action.tab as IccTabMenuConfig).portalName);
          if (tab) {
            const newtabs = [...oldState.tabs];
            newtabs.push({ ...tab, ...action.tab });
            tabs = [...newtabs];
            selectedTabIndex = tabs.length - 1;
          }
        } else {
          selectedTabIndex = find;
        }
        newState[key] = {
          ...state[key],
          tabsConfig: {
            ...state[key].tabsConfig,
            selectedTabIndex,
          },
          tabs,
        };
      }
      //console.log(' setAddTab newState=', newState);
      return { ...newState };
    }),
    on(tabsActions.setDragDropTab, (state, action) => {
      const key = action.tabsId;
      const newState: TabsState = { ...state };
      if (state[key]) {
        const oldState = state[key];
        const tabs = oldState.tabs;
        const prevActive = tabs[oldState.tabsConfig.selectedTabIndex];
        moveItemInArray(tabs, action.previousIndex, action.currentIndex);
        newState[key] = {
          ...state[key],
          tabsConfig: {
            ...state[key].tabsConfig,
            selectedTabIndex: tabs.indexOf(prevActive),
          },
          tabs,
        };
      }
      //console.log(' setDragDropTab newState=', newState);
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
