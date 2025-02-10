import { CommonModule } from '@angular/common';
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
import { IccLocaleDatePipe } from '@icc/ui/core';
import { IccFieldsErrorsComponent } from '@icc/ui/fields'; // TODO '../field-errors/field-errors.component';
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
import { delay, Subject, Subscription, take, takeUntil, timer } from 'rxjs';
import { defaultDateFieldConfig, IccDateFieldConfig } from '../model/date-field.model';
import { IccDatePickerOverlayComponent } from '../picker-overlay/date-picker-overlay.component';
import { IccDateRangeStoreService } from '../services/date-range-store.service';

@Component({
  selector: 'icc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
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
    IccLocaleDatePipe,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccDatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccDatePickerComponent),
      multi: true,
    },
    IccDateRangeStoreService,
    provideNativeDateAdapter(),
  ],
})
export class IccDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService);
  private dialogService = inject(IccDialogService);
  private injector = inject(Injector);
  private rangeStoreService = inject(IccDateRangeStoreService);

  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccDateFieldConfig;
  private _value!: Date | string;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccDateFieldConfig>) {
    console.log(' ssssss fieldConfig=', fieldConfig);
    this._fieldConfig = { ...defaultDateFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccDateFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccDateFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<Date | string>(''),
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
  set value(val: Date | string) {
    this._value = val;
    this.initForm({ ...defaultDateFieldConfig });
    this.field.setValue(val);
    this.rangeStoreService.updateSelected(val as Date);
  }
  get value(): Date | string {
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

  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef<HTMLInputElement>;
  @Output() valueChange = new EventEmitter<Date | string>(undefined);
  private dateUpdate$!: Subscription;

  constructor() {
    this.translateService.onLangChange
      .pipe(delay(50), takeUntil(this.destroy$))
      .subscribe(() => this.setLocaleChange());
  }

  ngOnInit(): void {
    this.dateUpdate$ = this.rangeStoreService.updateSelected$.subscribe((selectedDate) => {
      this.field.setValue(selectedDate);
      this.valueChange.emit(selectedDate);
    });
  }

  private setLocaleChange(): void {
    const fieldValue = this.field.value;
    this.field.setValue('');
    timer(5)
      .pipe(take(1))
      .subscribe(() => this.field.setValue(fieldValue));
  }

  // TODO add options.calendarOverlayConfig
  openCalendar(): void {
    this.dialogService.open(IccDatePickerOverlayComponent, {
      context: {
        fieldConfig: this.fieldConfig,
      },
      hostElemRef: this.calendarInput,
      injector: this.injector,
    });
  }

  public resetSelectedDate(selectedDate: Date | null) {
    this.rangeStoreService.updateSelected(selectedDate);
  }

  clearSelectedDate(event: MouseEvent) {
    this.resetSelectedDate(null);
  }

  onChange(val: Date): void {
    this.field.markAsTouched();
    this.valueChange.emit(val);
  }

  clearValue(): void {
    this.value = '';
    this.valueChange.emit('');
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: (value: Date) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: { [key: string]: Date }): void {
    this.form.patchValue(value, { emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { [this.fieldConfig.fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.dateUpdate$) {
      this.dateUpdate$.unsubscribe();
    }
  }
}
