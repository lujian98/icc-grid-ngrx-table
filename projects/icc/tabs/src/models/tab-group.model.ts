import { InjectionToken } from '@angular/core';

export interface IccTabGroupConfig {
  animationDuration?: string;
  disablePagination?: boolean;
  fitInkBarToContent?: boolean;
  dynamicHeight?: boolean;
  contentTabIndex?: number;
  preserveContent?: boolean;
  stretchTabs?: boolean;
  alignTabs?: 'start' | 'center' | 'end';
}

export const ICC_TAB_GROUP_CONFIG = new InjectionToken<IccTabGroupConfig>('ICC_TAB_GROUP_CONFIG');
