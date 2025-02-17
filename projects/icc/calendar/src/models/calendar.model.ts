export interface IccCalendarConfig {
  selectedLabel?: string;
  dateFormat: string;
  excludeWeekends: boolean;
  minDate: Date | null;
  maxDate: Date | null;
}

export const defaultCalendarConfig: IccCalendarConfig = {
  dateFormat: 'mediumDate',
  excludeWeekends: false,
  minDate: null,
  maxDate: null,
};
