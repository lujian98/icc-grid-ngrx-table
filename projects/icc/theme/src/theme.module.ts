import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ICC_DOCUMENT, ICC_THEME_OPTIONS, ICC_WINDOW, IccThemeOptions } from './theme.options';
import { IccThemeService } from './theme.service';

export function iccWindowFactory() {
  return window;
}

@NgModule({
  imports: [CommonModule],
})
export class IccThemeModule {
  static forRoot(iccThemeOptions: IccThemeOptions = { name: 'light' }): ModuleWithProviders<IccThemeModule> {
    return {
      ngModule: IccThemeModule,
      providers: [
        { provide: ICC_THEME_OPTIONS, useValue: iccThemeOptions || {} },
        { provide: ICC_WINDOW, useFactory: iccWindowFactory },
        { provide: ICC_DOCUMENT, useExisting: DOCUMENT },
        IccThemeService,
      ],
    };
  }
}
