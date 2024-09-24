import { FormStyle, getLocaleDayNames, TranslationWidth } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
//import { IccTranslationService } from 'iccbird-seven-ui/core';

@Component({
  selector: 'icc-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccWeekdaysComponent implements OnInit {
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

  constructor() //private translationService: IccTranslationService
  {}

  ngOnInit(): void {
    if (!this.locale) {
      //this.locale = this.translationService.currentLang;
    }
  }

  private getWeekdays() {
    return getLocaleDayNames(this.locale!, FormStyle.Format, TranslationWidth.Wide);
  }

  private getWeekdaysAbbr() {
    return getLocaleDayNames(this.locale!, FormStyle.Format, TranslationWidth.Narrow);
  }
}
