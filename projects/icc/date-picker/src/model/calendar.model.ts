export interface IccCalendarConfig {
  selectedLabel?: string; // -> prefixLabel
  dateFormat: string; // 'mediumDate'
  excludeWeekends: boolean;
  minDate: Date | null;
  maxDate: Date | null;
}

export const defaultCalendarConfig: IccCalendarConfig = {
  dateFormat: 'mediumDate',
  excludeWeekends: false,
  minDate: null, //new Date('1900-01-01T18:30:00.000Z'),
  maxDate: null, //new Date('2222-06-24T18:30:00.000Z'),
};
