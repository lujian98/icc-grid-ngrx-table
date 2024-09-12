import { InjectionToken } from '@angular/core';

export interface IccUIModulesOptions {
  backend: {
    baseUrl: string;
  };
}

export const ICC_UI_MODULES_OPTIONS = new InjectionToken<IccUIModulesOptions>('ICC UI MODULES OPTIONS');
