import { IccMenuConfig } from '@icc/ui/menu';
import { createAction, props } from '@ngrx/store';
import { IccTabConfig, IccTabsConfig } from '../models/tabs.model';

export const initTabsConfig = createAction(
  '[Tabs] Init Tabs Config',
  props<{ tabsId: string; tabsConfig: IccTabsConfig }>(),
);

export const loadRemoteTabsConfig = createAction(
  '[Tabs] Load Remote Tabs Config',
  props<{ tabsId: string; tabsConfig: IccTabsConfig }>(),
);

export const loadTabsConfigSuccess = createAction(
  '[Tabs] Load Tabs Config Success',
  props<{ tabsId: string; tabsConfig: IccTabsConfig }>(),
);

export const loadTabsTabs = createAction(
  '[Tabs] Load Tabs Tabs',
  props<{ tabsId: string; tabsConfig: IccTabsConfig }>(),
);

export const loadTabsTabsSuccess = createAction(
  '[Tabs] Load Tabs Tabs Success',
  props<{ tabsId: string; tabs: IccTabConfig[] }>(),
);

export const loadTabsOptions = createAction(
  '[Tabs] Load Tab Options',
  props<{ tabsId: string; tabsConfig: IccTabsConfig }>(),
);

export const loadTabsOptionsSuccess = createAction(
  '[Tabs] Load Tab Options Success',
  props<{ tabsId: string; options: IccTabConfig[] }>(),
);

export const setAddTab = createAction('[Tabs] Set Add Tab', props<{ tabsId: string; tab: IccTabConfig }>());

export const setDragDropTab = createAction(
  '[Tabs] Set Drag Drop Tab',
  props<{ tabsId: string; previousIndex: number; currentIndex: number }>(),
);

export const setSelectedIndex = createAction('[Tabs] Set Selected Index', props<{ tabsId: string; index: number }>());

export const setContextMenuClicked = createAction(
  '[Tabs] Set Context Menu Clicked',
  props<{ tabsId: string; menuItem: IccMenuConfig; tab: IccTabConfig; index: number }>(),
);

export const setCloseTab = createAction('[Tabs] Set Close Tab', props<{ tabsId: string; tab: IccTabConfig }>());

export const clearTabsStore = createAction('[Tabs]] Clear Tabs Store', props<{ tabsId: string }>());
export const removeTabsStore = createAction('[Tabs]] Remove Tabs Store', props<{ tabsId: string }>());
