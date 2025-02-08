import { InjectionToken } from '@angular/core';

export interface IccDatePresetItem {
  presetLabel: string;
  range?: IccDateRange;
  selectedDate?: Date;
}

export interface IccDateRange {
  fromDate?: Date | null;
  toDate?: Date | null;
}

export interface IccCalendarOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  shouldCloseOnBackdropClick?: boolean;
}

const DEFAULT_CONFIG: IccCalendarOverlayConfig = {
  panelClass: 'icc-date-range-overlay',
  hasBackdrop: true,
  backdropClass: 'icc-date-range-overlay-backdrop',
  shouldCloseOnBackdropClick: true,
};

export const ICC_CALENDAR_OVERLAY_CONFIG = new InjectionToken<IccCalendarOverlayConfig>('Calendar Overlay options');

export interface IccDateSelectionOptions {
  presets?: Array<IccDatePresetItem>;
  format?: string;
  excludeWeekends?: boolean;
  locale?: string;
  selectedDate?: Date | null;
  minMax?: IccDateRange;
  applyLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
  animation?: boolean;
  calendarOverlayConfig?: IccCalendarOverlayConfig;
  placeholder?: string;
  datePrefix?: string;
  inputPrefix?: string;
}

export interface IccDateRangeOptions extends IccDateSelectionOptions {
  range: IccDateRange;
  fromMinMax?: IccDateRange;
  toMinMax?: IccDateRange;
  startDatePrefix?: string;
  endDatePrefix?: string;
}
