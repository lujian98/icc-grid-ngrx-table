import { CommonModule, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IccSelectFieldComponent } from '@icc/ui/fields';
import {
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutMainComponent,
} from '@icc/ui/layout';
import { IccThemeService } from '@icc/ui/theme';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, take } from 'rxjs';

export interface Language {
  isocode: string;
  name?: string;
  nativeName?: string;
}

export const languages: Language[] = [
  {
    isocode: 'en-US',
    name: 'English',
    nativeName: 'English',
  },
  {
    isocode: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
  {
    isocode: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  {
    isocode: 'ja',
    name: 'Japanese',
    nativeName: '日本',
  },
  {
    isocode: 'zh-CN',
    name: 'Simplified Chinese',
    nativeName: '简体中文',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IccLayoutComponent,
    IccLayoutMainComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
    IccSelectFieldComponent,
  ],
})
export class AppComponent implements OnInit {
  themeService = inject(IccThemeService);
  private translateService = inject(TranslateService);
  languages = languages;
  currentLang = '';
  selectedLang: Language | undefined;
  title = 'icc-demo';

  gridUrl = `grid`;
  d3Url = `d3`;
  formUrl = `form`;
  selectUrl = `select`;
  rangeValue = this.themeService.rangeMax;

  langSelectionConfig = {
    fieldName: 'language',
    optionLabel: 'name',
    optionKey: 'isocode',
    clearValue: false,
  };

  ngOnInit(): void {
    this.currentLang = 'en-US';
    this.selectedLang = languages.find((lang) => lang.isocode === this.currentLang);
    this.localeInitializer(this.currentLang);
  }

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
    this.rangeValue = this.themeService.rangeMax;
    console.log(' this.rangeValue=', this.rangeValue);
  }

  onChange(event: any): void {
    const value: number = event.target.value;
    this.themeService.setBackgroundColor(value);
  }

  setLang(selected: Language): void {
    if (this.currentLang !== selected.isocode) {
      this.currentLang = selected.isocode;
      this.localeInitializer(selected.isocode);
      this.translateService.use(selected.isocode);
    }
  }

  private localeInitializer(key: string): void {
    const localeId = key.indexOf('-') > -1 ? key.substring(0, key.indexOf('-')) : key;
    const base = import(
      /* webpackInclude: /(en|ja|de|zh|fr|ru|tr)\.mjs/ */
      /* webpackMode: "lazy-once" */
      /* webpackChunkName: "i18n-base" */
      `../../../../node_modules/@angular/common/locales/${localeId}`
    );
    const extra = import(
      /* webpackInclude: /(en|ja|de|zh|fr|ru|tr)\.mjs/ */
      /* webpackMode: "lazy-once" */
      /* webpackChunkName: "i18n-base" */
      `../../../../node_modules/@angular/common/locales/extra/${localeId}`
    );
    combineLatest([base, extra])
      .pipe(take(1))
      .subscribe(([baseModule, extraModule]) => {
        registerLocaleData(baseModule.default, key, extraModule.default);
      });

    console.log(' localeInitializer key=', key);
  }
}
