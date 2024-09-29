import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    this.translateService.use(this.currentLang.isocode);
  }

  get currentLang(): IccLanguage {
    return this._currentLang;
  }

  constructor() {
    this.currentLang = languages[0];
  }
}
