import localeEn from './locale_en';
import { global } from './global';
//deprecated from angular common
export enum WeekDay {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum FormatWidth {
  /**
   * For `en-US`, `'M/d/yy, h:mm a'`
   * (Example: `6/15/15, 9:03 AM`)
   */
  Short,
  /**
   * For `en-US`, `'MMM d, y, h:mm:ss a'`
   * (Example: `Jun 15, 2015, 9:03:01 AM`)
   */
  Medium,
  /**
   * For `en-US`, `'MMMM d, y, h:mm:ss a z'`
   * (Example: `June 15, 2015 at 9:03:01 AM GMT+1`)
   */
  Long,
  /**
   * For `en-US`, `'EEEE, MMMM d, y, h:mm:ss a zzzz'`
   * (Example: `Monday, June 15, 2015 at 9:03:01 AM GMT+01:00`)
   */
  Full,
}

export enum LocaleDataIndex {
  LocaleId = 0,
  DayPeriodsFormat,
  DayPeriodsStandalone,
  DaysFormat,
  DaysStandalone,
  MonthsFormat,
  MonthsStandalone,
  Eras,
  FirstDayOfWeek,
  WeekendRange,
  DateFormat,
  TimeFormat,
  DateTimeFormat,
  NumberSymbols,
  NumberFormats,
  CurrencyCode,
  CurrencySymbol,
  CurrencyName,
  Currencies,
  Directionality,
  PluralCase,
  ExtraData,
}

export function getLocaleDateFormat(locale: string, width: FormatWidth): string {
  const data = findLocaleData(locale);
  return getLastDefinedValue(data[LocaleDataIndex.DateFormat], width);
}

function getLastDefinedValue<T>(data: T[], index: number): T {
  for (let i = index; i > -1; i--) {
    if (typeof data[i] !== 'undefined') {
      return data[i];
    }
  }
  throw new Error('Locale data API: locale data undefined');
}

export function getLocaleFirstDayOfWeek(locale: string): WeekDay {
  const data = findLocaleData(locale);
  return data[LocaleDataIndex.FirstDayOfWeek];
}

export function findLocaleData(locale: string): any {
  const normalizedLocale = normalizeLocale(locale);

  let match = getLocaleData(normalizedLocale);
  if (match) {
    return match;
  }

  // let's try to find a parent locale
  const parentLocale = normalizedLocale.split('-')[0];
  match = getLocaleData(parentLocale);
  if (match) {
    return match;
  }

  if (parentLocale === 'en') {
    return localeEn;
  }

  throw new Error(`Missing locale data for the locale "${locale}".`);
}

function normalizeLocale(locale: string): string {
  return locale.toLowerCase().replace(/_/g, '-');
}

let LOCALE_DATA: { [localeId: string]: any } = {};

export function getLocaleData(normalizedLocale: string): any {
  if (!(normalizedLocale in LOCALE_DATA)) {
    LOCALE_DATA[normalizedLocale] = console.log(' global=', global);
    global.ng && global.ng.common && global.ng.common.locales && global.ng.common.locales[normalizedLocale];
  }
  return LOCALE_DATA[normalizedLocale];
}
