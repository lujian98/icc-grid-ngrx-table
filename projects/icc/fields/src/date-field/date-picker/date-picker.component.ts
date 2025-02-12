import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCalendarComponent, IccCalendarConfig, IccPickerOverlayAnimations } from '@icc/ui/calendar';
import {
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutFooterEndComponent,
  IccLayoutFooterStartComponent,
} from '@icc/ui/layout';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { IccDateFieldConfig, defaultDateFieldConfig } from '../models/date-field.model';
import { IccDateStoreService } from '../services/date-store.service';

@Component({
  selector: 'icc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [IccPickerOverlayAnimations.transformPanel],
  imports: [
    CommonModule,
    IccButtonComponent,
    TranslateDirective,
    IccCalendarComponent,
    IccLayoutComponent,
    IccLayoutFooterComponent,
    IccLayoutFooterEndComponent,
    IccLayoutFooterStartComponent,
  ],
})
export class IccDatePickerComponent implements OnInit {
  private overlayRef = inject(OverlayRef);
  private translateService = inject(TranslateService);
  private dateStoreService = inject(IccDateStoreService);
  private adapter = inject(DateAdapter<Date>);

  calendarConfig!: Partial<IccCalendarConfig>;
  selectedDate!: Date | null;
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
    this.selectedDate = this.dateStoreService.selectedDate;
  }

  updateSelectedDate(date: Date | null): void {
    this.selectedDate = date;
    //this.rangeStoreService.updateSelected(this.selectedDate);
  }

  //updateSelectDateByPreset(presetItem: IccDatePresetItem): void {
  //  this.updateSelectedDate(presetItem.selectedDate ? presetItem.selectedDate : null);
  //}

  applyNewDates(e: MouseEvent): void {
    this.dateStoreService.updateSelected(this.selectedDate!);
    this.disposeOverLay();
  }

  discardNewDates(e: MouseEvent): void {
    this.disposeOverLay();
  }

  clearSelectedDates(e: MouseEvent): void {
    this.dateStoreService.clearSelected();
    this.disposeOverLay();
  }

  private disposeOverLay(): void {
    this.overlayRef.dispose();
  }
}
