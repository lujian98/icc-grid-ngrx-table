import { InjectionToken } from '@angular/core';

// used in tab-groups.ts
export interface IccTabsConfig {
  animationDuration?: string;
  disablePagination?: boolean;
  fitInkBarToContent?: boolean;
  dynamicHeight?: boolean;
  contentTabIndex?: number;
  preserveContent?: boolean;
  stretchTabs?: boolean;
  alignTabs?: 'start' | 'center' | 'end';
}
export const ICC_TABS_CONFIG = new InjectionToken<IccTabsConfig>('ICC_TABS_CONFIG');
