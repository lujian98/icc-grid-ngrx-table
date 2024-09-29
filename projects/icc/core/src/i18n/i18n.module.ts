import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { iccUiTranslations } from './assets/translations/translations';
import { IccI18nService } from './i18n.service';

@NgModule({
  imports: [TranslateModule],
})
export class IccI18nModule {
  private translateService = inject(TranslateService);

  static forRoot(): ModuleWithProviders<IccI18nModule> {
    return {
      ngModule: IccI18nModule,
      providers: [IccI18nService],
    };
  }

  constructor() {
    type LangKey = keyof typeof iccUiTranslations;
    for (const key of Object.keys(iccUiTranslations)) {
      this.translateService.setTranslation(key, iccUiTranslations[key as LangKey]);
    }
  }
}
