import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { datePickerViewBaseTranslations } from './assets/translations/translations';

import { DATE } from './services/date-range-store.service';

@NgModule({
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule],
  providers: [
    { provide: DATE, useValue: new Date() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
})
export class IccDatePickerModule {
  constructor(private translationService: TranslateService) {
    type LangKey = keyof typeof datePickerViewBaseTranslations;
    for (const key of Object.keys(datePickerViewBaseTranslations)) {
      this.translationService.setTranslation(key, datePickerViewBaseTranslations[key as LangKey]);
    }
  }
}
