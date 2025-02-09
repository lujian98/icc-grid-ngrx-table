import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { datePickerViewBaseTranslations } from './assets/translations/translations';

@NgModule({
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule],
})
export class IccDatePickerModule {
  constructor(private translationService: TranslateService) {
    type LangKey = keyof typeof datePickerViewBaseTranslations;
    for (const key of Object.keys(datePickerViewBaseTranslations)) {
      this.translationService.setTranslation(key, datePickerViewBaseTranslations[key as LangKey]);
    }
  }
}
