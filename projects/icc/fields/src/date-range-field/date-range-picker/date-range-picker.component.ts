import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCalendarComponent, IccCalendarConfig, IccPickerOverlayAnimations } from '@icc/ui/calendar';
import {
  IccLayoutComponent,
  IccLayoutFooterCenterComponent,
  IccLayoutFooterComponent,
  IccLayoutFooterEndComponent,
  IccLayoutFooterStartComponent,
} from '@icc/ui/layout';
import { IccSelectFieldComponent } from '../../select-field/select-field.component';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { take, timer } from 'rxjs';
import {
  IccDateRangeFieldConfig,
  defaultDateRangeFieldConfig,
  iccDefaultDateRangePresets,
  presetSelectionConfig,
  IccDateRangePresetItem,
} from '../models/date-range-field.model';
import { IccDateRangeStoreService } from '../services/date-range-store.service';

@Component({
  selector: 'icc-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // use Default to sync calendar
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
    IccLayoutFooterCenterComponent,
    IccSelectFieldComponent,
  ],
})
export class IccDateRangePickerComponent implements AfterViewInit, OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private overlayRef = inject(OverlayRef);
  private translateService = inject(TranslateService);
  private rangeStoreService = inject(IccDateRangeStoreService);
  private adapter = inject(DateAdapter<Date>);

  fromCalendarConfig!: Partial<IccCalendarConfig>;
  toCalendarConfig!: Partial<IccCalendarConfig>;
  fromDate!: Date | null;
  toDate!: Date | null;
  selectedRangeDates: Array<Date> = [];
  shouldAnimate: string = 'enter'; // 'enter' : 'noop';

  private _fieldConfig!: IccDateRangeFieldConfig;
  @Input()
  set fieldConfig(fieldConfig: IccDateRangeFieldConfig) {
    this._fieldConfig = fieldConfig;
    this._fieldConfig = { ...defaultDateRangeFieldConfig, ...fieldConfig };

    this.fromCalendarConfig = {
      selectedLabel: this.fieldConfig.startDateLabel,
      dateFormat: this.fieldConfig.dateFormat,
      excludeWeekends: this.fieldConfig.excludeWeekends,
      minDate: this.fieldConfig.fromMinMax.fromDate,
      maxDate: this.fieldConfig.fromMinMax.toDate,
    };

    this.toCalendarConfig = {
      selectedLabel: this.fieldConfig.endDateLabel,
      dateFormat: this.fieldConfig.dateFormat,
      excludeWeekends: this.fieldConfig.excludeWeekends,
      minDate: this.fieldConfig.toMinMax.fromDate,
      maxDate: this.fieldConfig.toMinMax.toDate,
    };
  }
  get fieldConfig(): IccDateRangeFieldConfig {
    return this._fieldConfig;
  }

  presetSelectionConfig = presetSelectionConfig;
  presets: IccDateRangePresetItem[] = [];

  ngOnInit(): void {
    this.adapter.setLocale(this.translateService.currentLang);
    this.fromDate = this.rangeStoreService.fromDate;

    this.presets = [...iccDefaultDateRangePresets].map((item) => {
      return {
        label: this.translateService.instant(item.label),
        range: item.range,
      };
    });
  }

  ngAfterViewInit(): void {
    if (this.fromDate) {
      this.fromMonthViewChange(this.fromDate);
    }
    timer(50)
      .pipe(take(1))
      .subscribe(() => {
        if (this.rangeStoreService.toDate) {
          this.toDate = this.rangeStoreService.toDate;
          if (!this.isRangeInCurrentMonth()) {
            this.toMonthViewChange(this.toDate);
          }
          this.setSelectedRangeDates();
        }
      });
  }

  private isRangeInCurrentMonth(): boolean {
    const date = this.toDate;
    const pDate = this.fromDate;
    if (date && pDate && date.getFullYear() === pDate.getFullYear() && date.getMonth() === pDate.getMonth()) {
      const tDate = new Date();
      if (date.getFullYear() === tDate.getFullYear() && date.getMonth() === tDate.getMonth()) {
        return true;
      }
    }
    return false;
  }

  updateFromDate(date: Date | null): void {
    this.checkSelectDateRange(date, 'from');
  }

  updateToDate(date: Date | null): void {
    this.checkSelectDateRange(date, 'to');
  }

  private checkSelectDateRange(date: Date | null, type: string): void {
    if (this.fromDate && this.toDate) {
      if (type === 'from') {
        this.fromDate = date;
        this.toDate = null;
      } else if (type === 'to') {
        this.fromDate = null;
        this.toDate = date;
      }
    } else {
      if (!this.fromDate) {
        this.fromDate = date;
      } else {
        this.toDate = date;
      }
    }
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      const tdate = this.fromDate;
      this.fromDate = this.toDate;
      this.toDate = tdate;
    }
    this.setSelectedRangeDates();
  }

  private setSelectedRangeDates(): void {
    this.selectedRangeDates = [];
    if (this.fromDate && this.toDate) {
      let mdate = new Date(this.fromDate.getTime());
      mdate = new Date(mdate.setDate(mdate.getDate() - 1));
      while (mdate < this.toDate) {
        this.selectedRangeDates.push(mdate);
        mdate = new Date(mdate.setDate(mdate.getDate() + 1));
      }
    }
    this.changeDetectorRef.markForCheck();
  }

  fromMonthViewChange(date: Date): void {
    // TODO only run initial???
    //this.toMinDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.toCalendarConfig.minDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.changeDetectorRef.markForCheck();
  }

  toMonthViewChange(date: Date): void {
    // TODO only run initial???
    this.fromCalendarConfig.maxDate = new Date(date.getFullYear(), date.getMonth(), 0);
    this.changeDetectorRef.markForCheck();
    //this.fromMaxDate = new Date(date.getFullYear(), date.getMonth(), 0);
  }

  updateRangeByPreset(item: IccDateRangePresetItem): void {
    this.fromDate = null;
    this.toDate = null;
    this.updateFromDate(item.range.fromDate ? item.range.fromDate : null);

    setTimeout(() => {
      this.updateToDate(item.range.toDate ? item.range.toDate : null);
    }, 50);
  }

  applyNewDates(e: MouseEvent): void {
    if (this.fromDate && !this.toDate) {
      this.toDate = new Date(this.fromDate);
    } else if (!this.fromDate && this.toDate) {
      this.fromDate = new Date(this.toDate);
    }
    if (this.toDate && this.fromDate?.getTime() === this.toDate?.getTime()) {
      this.toDate = new Date(this.toDate.setDate(this.toDate.getDate() + 1));
    }
    this.rangeStoreService.updateRange(this.fromDate, this.toDate);
    this.disposeOverLay();
  }

  discardNewDates(e: MouseEvent): void {
    this.disposeOverLay();
  }

  private disposeOverLay(): void {
    this.overlayRef.dispose();
  }
}
