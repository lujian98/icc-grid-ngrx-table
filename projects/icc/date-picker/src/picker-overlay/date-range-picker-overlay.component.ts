import { OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { IccCalendarPresetsComponent } from '../calendar-presets/calendar-presets.component';
import { IccCalendarWrapperComponent } from '../calendar-wrapper/calendar-wrapper.component';
import { IccDatePresetItem } from '../model/model';
import { IccDateConfigStoreService } from '../services/date-config-store.service';
import { IccDateRangeStoreService } from '../services/date-range-store.service';
import { IccPickerOverlayAnimations } from './picker-overlay.animations';

@Component({
  selector: 'icc-date-range-picker-overlay',
  templateUrl: './date-range-picker-overlay.component.html',
  animations: [IccPickerOverlayAnimations.transformPanel],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslateDirective, IccCalendarWrapperComponent, IccCalendarPresetsComponent],
})
export class IccDateRangePickerOverlayComponent implements AfterViewInit, OnInit {
  fromDate!: Date | null;
  toDate!: Date | null;
  fromMinDate!: Date | null;
  fromMaxDate!: Date | null;
  toMinDate!: Date | null;
  toMaxDate!: Date | null;
  presets: Array<IccDatePresetItem> | undefined = [];
  startDatePrefix!: string;
  endDatePrefix!: string;
  applyLabel!: string;
  cancelLabel!: string;
  shouldAnimate!: string;
  selectedRangeDates: Array<Date> = [];

  constructor(
    private rangeStoreService: IccDateRangeStoreService,
    private configStoreService: IccDateConfigStoreService,
    private overlayRef: OverlayRef,
    private translationService: TranslateService,
    private adapter: DateAdapter<Date>,
  ) {}

  ngOnInit() {
    this.adapter.setLocale(this.translationService.currentLang);
    this.fromDate = this.rangeStoreService.fromDate;
    this.startDatePrefix = this.configStoreService.dateRangeOptions.startDatePrefix || 'DATE_PICKER.FROM';
    this.endDatePrefix = this.configStoreService.dateRangeOptions.endDatePrefix || 'DATE_PICKER.TO';
    this.applyLabel = this.configStoreService.dateRangeOptions.applyLabel || 'DATE_PICKER.APPLY';
    this.cancelLabel = this.configStoreService.dateRangeOptions.cancelLabel || 'DATE_PICKER.CANCEL';
    this.presets = this.configStoreService.dateRangeOptions.presets;
    this.shouldAnimate = this.configStoreService.dateRangeOptions.animation ? 'enter' : 'noop';
    this.fromMinDate = this.getOptionDateValue(this.configStoreService.dateRangeOptions.fromMinMax?.fromDate);
    this.fromMaxDate = this.getOptionDateValue(this.configStoreService.dateRangeOptions.fromMinMax?.toDate);
    this.toMinDate = this.getOptionDateValue(this.configStoreService.dateRangeOptions.toMinMax?.fromDate);
    this.toMaxDate = this.getOptionDateValue(this.configStoreService.dateRangeOptions.toMinMax?.toDate);
  }

  private getOptionDateValue(date: Date | undefined | null): Date | null {
    return date ? date : null;
  }

  ngAfterViewInit() {
    if (this.fromDate) {
      this.fromMonthViewChange(this.fromDate);
    }
    setTimeout(() => {
      if (this.rangeStoreService.toDate) {
        this.toDate = this.rangeStoreService.toDate;
        if (!this.isRangeInCurrentMonth()) {
          this.toMonthViewChange(this.toDate);
        }
        this.setSelectedRangeDates();
      }
    }, 50);
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

  updateFromDate(date: Date | null) {
    this.checkSelectDateRange(date, 'from');
  }

  updateToDate(date: Date | null) {
    this.checkSelectDateRange(date, 'to');
  }

  private checkSelectDateRange(date: Date | null, type: string) {
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

  private setSelectedRangeDates() {
    this.selectedRangeDates = [];
    if (this.fromDate && this.toDate) {
      let mdate = new Date(this.fromDate.getTime());
      mdate = new Date(mdate.setDate(mdate.getDate() - 1));
      while (mdate < this.toDate) {
        this.selectedRangeDates.push(mdate);
        mdate = new Date(mdate.setDate(mdate.getDate() + 1));
      }
    }
  }

  fromMonthViewChange(date: Date) {
    this.toMinDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }

  toMonthViewChange(date: Date) {
    this.fromMaxDate = new Date(date.getFullYear(), date.getMonth(), 0);
  }

  updateRangeByPreset(presetItem: IccDatePresetItem) {
    this.fromDate = null;
    this.toDate = null;
    this.updateFromDate(presetItem.range?.fromDate ? presetItem.range.fromDate : null);
    setTimeout(() => {
      this.updateToDate(presetItem.range?.toDate ? presetItem.range.toDate : null);
    }, 50);
  }

  applyNewDates(e: MouseEvent) {
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

  discardNewDates(e: MouseEvent) {
    this.disposeOverLay();
  }

  private disposeOverLay() {
    this.overlayRef.dispose();
  }
}
