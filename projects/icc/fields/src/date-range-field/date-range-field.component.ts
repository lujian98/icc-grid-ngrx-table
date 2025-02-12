import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
import {
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
  IccInputDirective,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccSuffixDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccDialogService } from '@icc/ui/overlay';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccDateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { defaultDateRangeFieldConfig, IccDateRange, IccDateRangeFieldConfig } from './models/date-range-field.model';
import { IccDateRangeStoreService } from './services/date-range-store.service';

@Component({
  selector: 'icc-date-range-field',
  templateUrl: './date-range-field.component.html',
  styleUrls: ['./date-range-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    IccIconModule,
    IccFormFieldComponent,
    IccButtonComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccInputDirective,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccDateRangeFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccDateRangeFieldComponent),
      multi: true,
    },
    IccDateRangeStoreService,
    provideNativeDateAdapter(),
  ],
})
export class IccDateRangeFieldComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService);
  private dialogService = inject(IccDialogService);
  private injector = inject(Injector);
  private rangeStoreService = inject(IccDateRangeStoreService);

  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccDateRangeFieldConfig;
  private _value!: IccDateRange | null;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccDateRangeFieldConfig>) {
    this._fieldConfig = { ...defaultDateRangeFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccDateRangeFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccDateRangeFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<IccDateRange | null>(null),
      });
    }
    this.setFieldEditable();
  }

  private setFieldEditable(): void {
    timer(5)
      .pipe(take(1))
      .subscribe(() => (this.fieldConfig.editable ? this.field.enable() : this.field.disable()));
  }

  @Input()
  set value(val: IccDateRange | null) {
    this._value = val;
    this.initForm({ ...defaultDateRangeFieldConfig });
    this.field.setValue(val);
    this.rangeStoreService.updateRange(val?.fromDate!, val?.toDate!);
  }
  get value(): IccDateRange | null {
    return this._value;
  }

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hidden(): boolean {
    return !!this.fieldConfig.hidden || (this.field.disabled && !!this.fieldConfig.readonlyHidden);
  }

  get hasValue(): boolean {
    return !!this.field.value && !this.field.disabled;
  }

  get display(): string {
    const range = this.field.value;
    if (range.fromDate && !range.toDate) {
      range.toDate = range.fromDate;
    } else if (!range.fromDate && range.toDate) {
      range.fromDate = range.toDate;
    }
    const locale = this.translateService.currentLang || 'en-US';
    const from = new DatePipe(locale).transform(range.fromDate, this.fieldConfig.dateFormat);
    const to = new DatePipe(locale).transform(range.toDate, this.fieldConfig.dateFormat);
    if (range.fromDate && range.toDate) {
      return `${from} - ${to}`;
    } else {
      return '';
    }
  }

  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef<HTMLInputElement>;
  @Output() valueChange = new EventEmitter<IccDateRange | null>(undefined);

  ngOnInit(): void {
    this.rangeStoreService.rangeUpdate$.pipe(takeUntil(this.destroy$)).subscribe((range) => {
      this.field.setValue(range);
      this.valueChange.emit(range);
      this.changeDetectorRef.detectChanges();
    });
  }

  // TODO add options.calendarOverlayConfig
  openCalendar(): void {
    this.dialogService.open(IccDateRangePickerComponent, {
      context: {
        fieldConfig: this.fieldConfig,
      },
      hostElemRef: this.calendarInput,
      injector: this.injector,
    });
  }

  public resetDates(range: IccDateRange): void {
    this.rangeStoreService.updateRange(range.fromDate!, range.toDate!);
  }

  clearDateRange(event: MouseEvent): void {
    this.rangeStoreService.updateRange(null, null);
  }

  onChange(val: IccDateRange): void {
    this.field.markAsTouched();
    this.valueChange.emit(val);
  }

  clearValue(): void {
    this.value = null;
    this.valueChange.emit(null);
  }

  registerOnChange(fn: (value: IccDateRange) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: (value: IccDateRange) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: { [key: string]: IccDateRange }): void {
    this.form.patchValue(value, { emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { [this.fieldConfig.fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
