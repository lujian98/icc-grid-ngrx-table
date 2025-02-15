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
