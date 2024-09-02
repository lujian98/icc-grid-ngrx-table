import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import {
  IccThemeOptions,
  ICC_THEME_OPTIONS,
  ICC_DOCUMENT,
  ICC_WINDOW,
} from './theme.options';
import { IccThemeService } from './theme.service';
import { IccMediaBreakpointsService } from './media-breakpoints.service';

export function iccWindowFactory() {
  return window;
}

@NgModule({
  imports: [CommonModule],
})
export class IccThemeModule {
  static forRoot(
    iccThemeOptions: IccThemeOptions = { name: 'light' },
  ): ModuleWithProviders<IccThemeModule> {
    return {
      ngModule: IccThemeModule,
      providers: [
        { provide: ICC_THEME_OPTIONS, useValue: iccThemeOptions || {} },
        { provide: ICC_WINDOW, useFactory: iccWindowFactory },
        { provide: ICC_DOCUMENT, useExisting: DOCUMENT },
        IccThemeService,
        IccMediaBreakpointsService,
      ],
    };
  }
}
