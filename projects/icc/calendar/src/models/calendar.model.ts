export interface IccCalendarConfig {
  viewType: string; // calendar | rangeFrom | rangeTo
  selectedLabel?: string;
  dateFormat: string;
  excludeWeekends: boolean;
  minDate: Date | null;
  maxDate: Date | null;
}

export const defaultCalendarConfig: IccCalendarConfig = {
  viewType: 'calendar',
  dateFormat: 'mediumDate',
  excludeWeekends: false,
  minDate: null,
  maxDate: null,
};
