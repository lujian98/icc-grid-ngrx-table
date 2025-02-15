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
}

export const defaultTabsConfig: IccTabsConfig = {
  tabReorder: true,
  closeable: true,
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
    title: 'Close',
    name: IccContextMenuType.CLOSE,
    disabled: true,
  },
  {
    title: 'Close Other Tabs',
    name: IccContextMenuType.CLOSE_OTHER_TABS,
  },
  {
    title: 'Close Tabs To The Right',
    name: IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT,
  },
  {
    title: 'Close Tabs To The Left',
    name: IccContextMenuType.CLOSE_TABS_TO_THE_LEFT,
  },
  {
    title: 'Close All Tabs',
    name: IccContextMenuType.CLOSE_ALL_TABS,
  },
];
