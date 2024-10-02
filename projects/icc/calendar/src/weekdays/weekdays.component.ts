import { FormStyle, getLocaleDayNames, TranslationWidth } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'icc-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccWeekdaysComponent implements OnInit {
  private translateService = inject(TranslateService);

  weekdays!: readonly string[];
  weekdaysAbbr!: readonly string[];

  private _locale?: string;

  @Input()
  get locale() {
    return this._locale;
  }

  set locale(locale: string | undefined) {
    this._locale = locale;
    this.weekdays = this.getWeekdays();
    this.weekdaysAbbr = this.getWeekdaysAbbr();
  }

  ngOnInit(): void {
    //if (!this.locale) {
    this.locale = this.translateService.currentLang;
    //}
    //console.log( ' weekdata locale=', this.locale)
  }

  private getWeekdays() {
    return getLocaleDayNames(this.locale!, FormStyle.Format, TranslationWidth.Wide);
  }

  private getWeekdaysAbbr() {
    return getLocaleDayNames(this.locale!, FormStyle.Format, TranslationWidth.Narrow);
  }
}
