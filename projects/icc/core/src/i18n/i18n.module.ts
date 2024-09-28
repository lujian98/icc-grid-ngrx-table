import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { commonCoreBaseTranslations } from './assets/translations/translations';

@NgModule({
  imports: [TranslateModule],
  exports: [TranslateModule],
})
export class IccI18nModule {
  private translateService = inject(TranslateService);

  static forRoot(): ModuleWithProviders<IccI18nModule> {
    return {
      ngModule: IccI18nModule,
    };
  }

  constructor() {
    type LangKey = keyof typeof commonCoreBaseTranslations;
    for (const key of Object.keys(commonCoreBaseTranslations)) {
      this.translateService.setTranslation(key, commonCoreBaseTranslations[key as LangKey]);
    }
  }
}
