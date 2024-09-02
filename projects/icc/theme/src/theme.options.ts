import { InjectionToken } from '@angular/core';

export interface IccThemeOptions {
  name: string;
}

export const ICC_THEME_OPTIONS = new InjectionToken<IccThemeOptions>('Icc Theme Options');

export const ICC_WINDOW = new InjectionToken<Window>('Window');
export const ICC_DOCUMENT = new InjectionToken<Document>('Document');
