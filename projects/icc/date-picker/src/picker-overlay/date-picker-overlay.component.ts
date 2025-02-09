import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, inject, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCalendarWrapperComponent } from '../calendar-wrapper/calendar-wrapper.component';
import { IccDatePresetItem } from '../model/model';
import { IccDateConfigStoreService } from '../services/date-config-store.service';
import { IccDateRangeStoreService } from '../services/date-range-store.service';
import { IccPickerOverlayAnimations } from './picker-overlay.animations';
import { IccDateFieldConfig } from '../model/date-field.model';

@Component({
  selector: 'icc-date-picker-overlay',
  templateUrl: './date-picker-overlay.component.html',
  styleUrls: ['./date-picker-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [IccPickerOverlayAnimations.transformPanel],
  imports: [CommonModule, IccButtonComponent, TranslateDirective, IccCalendarWrapperComponent],
})
export class IccDatePickerOverlayComponent implements OnInit {
  //private changeDetectorRef = inject(ChangeDetectorRef);
  @Input() fieldConfig!: IccDateFieldConfig;
  //@Input() field!: FormControl;

  selectedDate: Date | null | undefined;
  minDate!: Date | null;
  maxDate!: Date | null;
  presets: Array<IccDatePresetItem> | undefined = [];
  datePrefix!: string;
  applyLabel!: string;
  cancelLabel!: string;
  clearLabel!: string;
  shouldAnimate!: string;

  constructor(
    private rangeStoreService: IccDateRangeStoreService,
    private configStoreService: IccDateConfigStoreService,
    private overlayRef: OverlayRef,
    private translationService: TranslateService,
    private adapter: DateAdapter<Date>,
  ) {}

  ngOnInit() {
    this.adapter.setLocale(this.translationService.currentLang);
    this.selectedDate = this.rangeStoreService.selectedDate;
    this.datePrefix = this.configStoreService.dateRangeOptions.datePrefix || 'DATE_PICKER.SELECTED_DATE';
    this.applyLabel = this.configStoreService.dateRangeOptions.applyLabel || 'DATE_PICKER.APPLY';
    this.cancelLabel = this.configStoreService.dateRangeOptions.cancelLabel || 'DATE_PICKER.CANCEL';
    this.clearLabel = this.configStoreService.dateRangeOptions.clearLabel || 'DATE_PICKER.CLEAR';
    this.presets = this.configStoreService.dateRangeOptions.presets;
    this.shouldAnimate = this.configStoreService.dateRangeOptions.animation ? 'enter' : 'noop';
    this.minDate = this.getOptionDateValue(this.configStoreService.dateRangeOptions.minMax?.fromDate);
    this.maxDate = this.getOptionDateValue(this.configStoreService.dateRangeOptions.minMax?.toDate);
  }

  private getOptionDateValue(date: Date | undefined | null): Date | null {
    return date ? date : null;
  }

  updateSelectedDate(date: Date | null) {
    this.selectedDate = date;
    //this.rangeStoreService.updateSelected(this.selectedDate);
  }

  updateSelectDateByPreset(presetItem: IccDatePresetItem) {
    this.updateSelectedDate(presetItem.selectedDate ? presetItem.selectedDate : null);
  }

  applyNewDates(e: MouseEvent) {
    this.rangeStoreService.updateSelected(this.selectedDate);
    this.disposeOverLay();
  }

  discardNewDates(e: MouseEvent) {
    this.disposeOverLay();
  }

  clearSelectedDates(e: MouseEvent) {
    this.rangeStoreService.clearSelected();
    this.disposeOverLay();
  }

  private disposeOverLay() {
    this.overlayRef.dispose();
  }
}
