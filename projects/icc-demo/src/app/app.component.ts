import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { combineLatest, take } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import { IccI18nService, IccLanguage } from '@icc/ui/core';
import { IccSelectFieldComponent } from '@icc/ui/fields';
import {
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutMainComponent,
} from '@icc/ui/layout';
import { IccThemeService } from '@icc/ui/theme';

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
  title = 'icc-demo';

  gridUrl = `grid`;
  d3Url = `d3`;
  formUrl = `form`;
  selectUrl = `select`;
  rangeValue = this.themeService.rangeMax;

  i18nService = inject(IccI18nService);
  currentLang = '';
  langSelectionConfig = {
    fieldName: 'language',
    optionLabel: 'name',
    optionKey: 'isocode',
    clearValue: false,
  };

  ngOnInit(): void {
    this.currentLang = 'zh-CN';
    this.i18nService.currentLang = this.currentLang;
    this.localeInitializer(this.currentLang);
  }

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
    this.rangeValue = this.themeService.rangeMax;
  }

  onChange(event: any): void {
    const value: number = event.target.value;
    this.themeService.setBackgroundColor(value);
  }

  setLang(selected: IccLanguage): void {
    if (this.currentLang !== selected.isocode) {
      this.currentLang = selected.isocode;
      this.i18nService.currentLang = this.currentLang;
      this.localeInitializer(this.currentLang);
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

    console.log(' xxxx localeInitializer key=', key);
  }
}
