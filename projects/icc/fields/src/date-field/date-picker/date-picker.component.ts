import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
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
import { IccCalendarComponent, IccCalendarConfig, IccPickerOverlayAnimations } from '@icc/ui/calendar';
import {
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutFooterEndComponent,
  IccLayoutFooterStartComponent,
} from '@icc/ui/layout';
import { IccSelectFieldComponent } from '../../select-field/select-field.component';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import {
  IccDateFieldConfig,
  defaultDateFieldConfig,
  presetDateSelectionConfig,
  IccDatePresetItem,
  iccDefaultDatePresets,
} from '../models/date-field.model';
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
    IccSelectFieldComponent,
  ],
})
export class IccDatePickerComponent implements OnInit {
  private overlayRef = inject(OverlayRef);
  private translateService = inject(TranslateService);
  private dateStoreService = inject(IccDateStoreService);
  private adapter = inject(DateAdapter<Date>);
  private _fieldConfig!: IccDateFieldConfig;

  calendarConfig!: Partial<IccCalendarConfig>;
  selectedDate!: Date | null;
  shouldAnimate: string = 'enter'; //  'enter' : 'noop';

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

  @Input() field: FormControl | null = null;

  presetSelectionConfig = presetDateSelectionConfig;
  presets: IccDatePresetItem[] = [];

  ngOnInit(): void {
    this.adapter.setLocale(this.translateService.currentLang);
    this.selectedDate = this.field ? this.field.value : this.dateStoreService.selectedDate;

    this.presets = [...iccDefaultDatePresets].map((item) => {
      return {
        label: this.translateService.instant(item.label),
        date: item.date,
      };
    });
  }

  updateSelectedDate(date: Date | null): void {
    this.selectedDate = date;
  }

  updateSelectDateByPreset(item: IccDatePresetItem): void {
    this.updateSelectedDate(item.date ? item.date : null);
  }

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
