import { IccPortalContent } from '@icc/ui/portal';
import { IccMenuConfig } from '@icc/ui/menu';
import { IccTabGroupConfig } from './tab-group.model';

export interface IccTabConfig {
  name: string;
  title?: string;
  content?: IccPortalContent<any>;
  context?: {};
  closeable?: boolean;
}

export interface IccTabsConfig extends IccTabGroupConfig {
  tabReorder: boolean;
  closeable: boolean;
  enableContextMenu: boolean;
  selectedTabIndex: number;
  name: string;
  urlKey: string; // Only for remote tab config and options
  remoteConfig: boolean; // remote config requires remote options
  remoteOptions: boolean;
  remoteTabs: boolean;
}

export const defaultTabsConfig: IccTabsConfig = {
  tabReorder: true,
  closeable: true,
  enableContextMenu: false,
  selectedTabIndex: 0,
  alignTabs: 'start',
  name: 'tabs',
  urlKey: 'tabs',
  remoteConfig: false,
  remoteOptions: false,
  remoteTabs: false,
};

export interface IccTabsSetting {
  // for internal setting
  tabsId: string;
  viewportReady: boolean;
}

export interface TabsState {
  [key: string]: IccTabsState;
}

export interface IccTabsState {
  tabsConfig: IccTabsConfig;
  tabsSetting: IccTabsSetting;
  tabs: IccTabConfig[];
  options: IccTabConfig[];
}

export const defaultTabsSetting: IccTabsSetting = {
  tabsId: '191cf2bb6b5',
  viewportReady: false,
};

export const defaultTabsState: IccTabsState = {
  tabsConfig: defaultTabsConfig,
  tabsSetting: defaultTabsSetting,
  tabs: [],
  options: [],
};

export interface IccTabMenuConfig extends IccMenuConfig, IccTabConfig {
  portalName?: string;
}

export enum IccContextMenuType {
  CLOSE = 'Close',
  CLOSE_OTHER_TABS = 'Close Other Tabs',
  CLOSE_TABS_TO_THE_RIGHT = 'Close Tabs To The Right',
  CLOSE_TABS_TO_THE_LEFT = 'Close Tabs To The Left',
  CLOSE_ALL_TABS = 'Close All Tabs',
}

export const defaultContextMenu = [
  {
    title: 'ICC.UI.ACTIONS.CLOSE',
    name: IccContextMenuType.CLOSE,
  },
  {
    title: 'ICC.UI.TABS.CLOSE_OTHER_TABS',
    name: IccContextMenuType.CLOSE_OTHER_TABS,
  },
  {
    title: 'ICC.UI.TABS.CLOSE_TABS_TO_THE_RIGHT',
    name: IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT,
  },
  {
    title: 'ICC.UI.TABS.CLOSE_TABS_TO_THE_LEFT',
    name: IccContextMenuType.CLOSE_TABS_TO_THE_LEFT,
  },
  {
    title: 'ICC.UI.TABS.CLOSE_ALL_TABS',
    name: IccContextMenuType.CLOSE_ALL_TABS,
  },
];
