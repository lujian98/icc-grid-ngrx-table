import { IccPortalContent } from '@icc/ui/portal';

export interface IccTabConfig {
  name: string;
  title?: string;
  content?: IccPortalContent<any>;
  context?: {};
  closeable?: boolean;
}

export interface IccTabsConfig {
  tabReorder: boolean;
  closeable: boolean;
}

export const defaultTabsConfig: IccTabsConfig = {
  tabReorder: true,
  closeable: true,
};
