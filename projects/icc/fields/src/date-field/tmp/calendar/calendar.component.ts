import { coerceNumberProperty } from '@angular/cdk/coercion';
import { getLocaleFirstDayOfWeek, WeekDay } from './common/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControl } from './modal/custom-control';
import { addMonths, isValidDate, startOfDay, startofMonth } from './date-utils/date.utils';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'icc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccCalendarComponent),
      multi: true,
    },
    {
      provide: CustomControl,
      useExisting: IccCalendarComponent,
    },
  ],
  standalone: false,
})
export class IccCalendarComponent
  extends CustomControl<Date>
  implements AfterContentInit, ControlValueAccessor, OnChanges, OnInit
{
  private translateService = inject(TranslateService);

  @ViewChild('content') modalRef!: TemplateRef<any>;
  months!: readonly Date[];
  touched = false;
  disabled = false;
  showMonthStepper = true;
  activeMonth?: Date;
  langSub$: Subscription = new Subscription();

  private onChange?: (updatedValue: Date) => void;
  private onTouched?: () => void;

  @Input() isOverlayOpen = false;
  @Input() closeOnValueChange = true;

  private _overlayOrigin!: CdkOverlayOrigin;

  set overlayOrigin(overlayOrigin: CdkOverlayOrigin) {
    this._overlayOrigin = overlayOrigin;
    this.changeDetectorRef.markForCheck();
  }

  get overlayOrigin() {
    return this._overlayOrigin;
  }

  @Input() value?: Date;
  @Input() min?: Date | null;
  @Input() monthAndYearFormat?: string;

  private _locale?: string; // = 'en-US';

  @Input()
  get locale() {
    return this._locale;
  }

  set locale(locale: string | undefined) {
    this._locale = locale;
  }

  private _firstDayOfWeek?: keyof typeof WeekDay;

  @Input()
  get firstDayOfWeek() {
    return this._firstDayOfWeek || this.getDefaultFirstDayOfWeek();
  }

  set firstDayOfWeek(firstDayOfWeek: keyof typeof WeekDay) {
    this._firstDayOfWeek = firstDayOfWeek;
  }

  private _firstMonth?: Date | null;

  @Input()
  get firstMonth(): Date | undefined | null {
    return this._firstMonth;
  }

  set firstMonth(firstMonth: Date | undefined | null) {
    this._firstMonth = firstMonth;
    this.activeMonth = this._firstMonth || undefined;
  }

  private _numberOfMonths = 1;

  @Input()
  get numberOfMonths() {
    return this._numberOfMonths;
  }

  set numberOfMonths(numberOfMonths: any) {
    this._numberOfMonths = coerceNumberProperty(numberOfMonths);
    this.showMonthStepper = this._numberOfMonths <= 2;
  }

  @Output() valueChange = new EventEmitter<Date>();

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (!this.locale) {
      this.locale = this.translateService.currentLang;
    }
  }

  ngAfterContentInit() {
    this.months = this.getMonths();
    this.langSub$ = this.translateService.onLangChange.subscribe((val) => {
      this.locale = val.lang;
      //console.log('Locale:', this.locale, 'Service Locale', val.lang);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    /*
    if (
      (changes.numberOfMonths && !changes.numberOfMonths.firstChange) ||
      (changes.firstMonth && !changes.firstMonth.firstChange)
    ) {
      this.months = this.getMonths();
    }*/
  }

  ngOnDestroy() {
    if (this.langSub$) {
      this.langSub$.unsubscribe();
    }
  }

  onActiveMonthChange(activeMonth: Date) {
    this.activeMonth = activeMonth;
    this.months = this.getMonths();
  }

  onSelect(date: Date) {
    if (!this.disabled) {
      this.value = date;
      this.activeMonth = date;
      this.valueChange.emit(date);
      if (this.onChange) {
        this.onChange(date);
        this.isOverlayOpen = false;
        this.changeDetectorRef.markForCheck();
      }
      if (this.onTouched) {
        this.onTouched();
      }
    }
  }

  writeValue(value: Date) {
    this.value = isValidDate(value) ? startOfDay(value) : undefined;
    this.changeDetectorRef.markForCheck();

    if (this.showMonthStepper && this.value) {
      this.activeMonth = this.value;
      this.months = this.getMonths();
    }
  }

  registerOnChange(onChangeCallback: (updatedValue: Date) => void) {
    this.onChange = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: () => void) {
    this.onTouched = () => {
      this.touched = true;
      onTouchedCallback();
    };
  }

  toggleOverlay() {
    this.isOverlayOpen = !this.isOverlayOpen;
    this.changeDetectorRef.markForCheck();
  }

  setDateToday() {
    const d = new Date();
    const today = new Date(`${d.toISOString().slice(0, 10)}` + 'T00:00');

    this.onSelect(today);
  }

  private getMonths() {
    const firstMonth = (this.showMonthStepper ? this.activeMonth : this.firstMonth) || new Date();
    const startofFirstMonth = startofMonth(firstMonth);
    return Array.from({ length: this.numberOfMonths }, (_, index) => addMonths(startofFirstMonth, index));
  }

  private getDefaultFirstDayOfWeek() {
    return WeekDay[getLocaleFirstDayOfWeek(this.locale!)] as keyof typeof WeekDay;
  }
}
