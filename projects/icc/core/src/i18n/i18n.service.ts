import { registerLocaleData } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, take } from 'rxjs';
import { IccLanguage, languages } from './i18n.model';

@Injectable()
export class IccI18nService {
  private translateService = inject(TranslateService);
  private _currentLang!: IccLanguage;
  languages = languages;

  set currentLang(lang: string | IccLanguage) {
    if (typeof lang === 'string') {
      const find = this.languages.find((item) => item.isocode === lang);
      if (find) {
        this._currentLang = find;
      }
    } else {
      this._currentLang = lang;
    }
    this.localeInitializer(this.currentLang.isocode);
    this.translateService.use(this.currentLang.isocode);
  }

  get currentLang(): IccLanguage {
    return this._currentLang;
  }

  constructor() {
    this.currentLang = languages[0];
  }

  setLang(selected: IccLanguage): void {
    if (this.currentLang?.isocode !== selected.isocode) {
      this.currentLang = selected;
    }
  }

  private localeInitializer(key: string): void {
    const localeId = key.indexOf('-') > -1 ? key.substring(0, key.indexOf('-')) : key;
    const base = import(
      /* webpackInclude: /(en|ja|de|zh|fr|ru|tr)\.mjs/ */
      /* webpackMode: "lazy-once" */
      /* webpackChunkName: "i18n-base" */
      `../../../../../node_modules/@angular/common/locales/${localeId}`
    );
    const extra = import(
      /* webpackInclude: /(en|ja|de|zh|fr|ru|tr)\.mjs/ */
      /* webpackMode: "lazy-once" */
      /* webpackChunkName: "i18n-base" */
      `../../../../../node_modules/@angular/common/locales/extra/${localeId}`
    );
    combineLatest([base, extra])
      .pipe(take(1))
      .subscribe(([baseModule, extraModule]) => {
        registerLocaleData(baseModule.default, key, extraModule.default);
      });

    //console.log(' localeInitializer key=', key);
  }
}
