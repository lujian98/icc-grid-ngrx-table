import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { IccCalendarWrapperComponent } from '../calendar-wrapper/calendar-wrapper.component';
import { IccCalendarConfig } from '../model/calendar.model';
import { IccDateFieldConfig, defaultDateFieldConfig } from '../model/date-field.model';
import { IccDateRangeStoreService } from '../services/date-range-store.service';
import { IccPickerOverlayAnimations } from './picker-overlay.animations';

@Component({
  selector: 'icc-date-picker-overlay',
  templateUrl: './date-picker-overlay.component.html',
  styleUrls: ['./date-picker-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [IccPickerOverlayAnimations.transformPanel],
  imports: [CommonModule, IccButtonComponent, TranslateDirective, IccCalendarWrapperComponent],
})
export class IccDatePickerOverlayComponent implements OnInit {
  private overlayRef = inject(OverlayRef);
  private translateService = inject(TranslateService);
  private rangeStoreService = inject(IccDateRangeStoreService);
  private adapter = inject(DateAdapter<Date>);

  calendarConfig!: Partial<IccCalendarConfig>;
  selectedDate: Date | null | undefined;
  shouldAnimate: string = 'enter'; //  'enter' : 'noop';

  private _fieldConfig!: IccDateFieldConfig;
  @Input()
  set fieldConfig(fieldConfig: IccDateFieldConfig) {
    this._fieldConfig = fieldConfig;
    this._fieldConfig = { ...defaultDateFieldConfig, ...fieldConfig };
    this.calendarConfig = {
      selectedLabel: this.fieldConfig.selectedLabel,
      dateFormat: this.fieldConfig.dateFormat,
      excludeWeekends: this.fieldConfig.excludeWeekends,
      minDate: this.fieldConfig.minDate,
      maxDate: this.fieldConfig.maxDate,
    };
  }
  get fieldConfig(): IccDateFieldConfig {
    return this._fieldConfig;
  }

  ngOnInit(): void {
    this.adapter.setLocale(this.translateService.currentLang);
    this.selectedDate = this.rangeStoreService.selectedDate;
  }

  updateSelectedDate(date: Date | null): void {
    this.selectedDate = date;
    //this.rangeStoreService.updateSelected(this.selectedDate);
  }

  //updateSelectDateByPreset(presetItem: IccDatePresetItem): void {
  //  this.updateSelectedDate(presetItem.selectedDate ? presetItem.selectedDate : null);
  //}

  applyNewDates(e: MouseEvent): void {
    this.rangeStoreService.updateSelected(this.selectedDate);
    this.disposeOverLay();
  }

  discardNewDates(e: MouseEvent): void {
    this.disposeOverLay();
  }

  clearSelectedDates(e: MouseEvent): void {
    this.rangeStoreService.clearSelected();
    this.disposeOverLay();
  }

  private disposeOverLay(): void {
    this.overlayRef.dispose();
  }
}
