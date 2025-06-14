import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
  output,
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
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService = inject(TranslateService);
  private readonly dialogService = inject(IccDialogService);
  private readonly injector = inject(Injector);
  private readonly rangeStoreService = inject(IccDateRangeStoreService);
  private readonly destroy$ = new Subject<void>();
  onChanged: Function = () => {};
  onTouched: Function = () => {};
  form = input(new FormGroup({}), { transform: (form: FormGroup) => form });
  showFieldEditIndicator = input<boolean>(true);
  fieldConfig = input.required({
    transform: (config: Partial<IccDateRangeFieldConfig>) => {
      const fieldConfig = { ...defaultDateRangeFieldConfig, ...config };
      this.initForm(fieldConfig);
      return fieldConfig;
    },
  });
  value = input(null, {
    transform: (value: IccDateRange | null) => {
      this.field.setValue(value);
      this.rangeStoreService.updateRange(value?.fromDate!, value?.toDate!);
      return value;
    },
  });
  valueChange = output<IccDateRange | null>();

  private initForm(fieldConfig: IccDateRangeFieldConfig): void {
    if (!this.form().get(fieldConfig.fieldName!)) {
      this.form().addControl(fieldConfig.fieldName!, new FormControl<IccDateRange | null>(null));
    }
    timer(5)
      .pipe(take(1))
      .subscribe(() => this.setDisabledState(!this.fieldConfig().editable));
  }

  get field(): FormControl {
    return this.form().get(this.fieldConfig().fieldName!)! as FormControl;
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hidden(): boolean {
    return !!this.fieldConfig().hidden || (this.field.disabled && !!this.fieldConfig().readonlyHidden);
  }

  get hasValue(): boolean {
    return !!this.field.value && !this.field.disabled;
  }

  get display(): string {
    const range = this.field.value;
    if (range && range.fromDate && range.toDate) {
      const locale = this.translateService.currentLang || 'en-US';
      const from = new DatePipe(locale).transform(range.fromDate, this.fieldConfig().dateFormat);
      const to = new DatePipe(locale).transform(range.toDate, this.fieldConfig().dateFormat);
      return `${from} - ${to}`;
    } else {
      return '';
    }
  }

  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.rangeStoreService.rangeUpdate$.pipe(takeUntil(this.destroy$)).subscribe((range) => {
      this.field.setValue(range);
      this.valueChange.emit(range);
      this.changeDetectorRef.detectChanges();
    });
  }

  openCalendar(): void {
    this.dialogService.open(IccDateRangePickerComponent, {
      context: {
        fieldConfig: this.fieldConfig(),
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

  clearValue(): void {
    this.field.setValue(null);
    this.valueChange.emit(null);
  }

  registerOnChange(fn: Function): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    disabled ? this.form().disable() : this.form().enable();
  }

  writeValue(value: { [key: string]: IccDateRange }): void {
    this.form().patchValue(value, { emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form().valid ? null : { [this.fieldConfig().fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
