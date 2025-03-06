import { IccPortalContent } from '@icc/ui/portal';
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
}

export const defaultTabsConfig: IccTabsConfig = {
  tabReorder: true,
  closeable: true,
  enableContextMenu: false,
  selectedTabIndex: 0,
  alignTabs: 'start',
};

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
