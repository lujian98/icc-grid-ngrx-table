import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  langSelectionConfig = {
    fieldName: 'language',
    optionLabel: 'name',
    optionKey: 'isocode',
    clearValue: false,
  };

  ngOnInit(): void {
    this.i18nService.currentLang = 'zh-CN';
  }

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
    this.rangeValue = this.themeService.rangeMax;
    //console.log(' this.rangeValue=', this.rangeValue);
  }

  onChange(event: any): void {
    const value: number = event.target.value;
    this.themeService.setBackgroundColor(value);
  }

  setLang(selected: IccLanguage): void {
    this.i18nService.setLang(selected);
  }
}
