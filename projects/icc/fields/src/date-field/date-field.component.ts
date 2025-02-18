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
import { delay, Subject, take, takeUntil, timer } from 'rxjs';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccDatePickerComponent } from './date-picker/date-picker.component';
import { defaultDateFieldConfig, IccDateFieldConfig } from './models/date-field.model';
import { IccDateStoreService } from './services/date-store.service';

@Component({
  selector: 'icc-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
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
      useExisting: forwardRef(() => IccDateFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccDateFieldComponent),
      multi: true,
    },
    IccDateStoreService,
    provideNativeDateAdapter(),
  ],
})
export class IccDateFieldComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService);
  private dialogService = inject(IccDialogService);
  private injector = inject(Injector);
  private dateStoreService = inject(IccDateStoreService);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccDateFieldConfig;
  private _value!: Date | null;

  @Input() form!: FormGroup;
  @Input() showFieldEditIndicator: boolean = true;
  @Input()
  set fieldConfig(fieldConfig: Partial<IccDateFieldConfig>) {
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
  set value(val: Date | null) {
    this._value = val;
    this.initForm({ ...defaultDateFieldConfig });
    this.field.setValue(val);
    this.dateStoreService.updateSelected(val);
  }
  get value(): Date | null {
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
    const date = this.field.value;
    if (date) {
      const locale = this.translateService.currentLang || 'en-US';
      return new DatePipe(locale).transform(date, this.fieldConfig.dateFormat)!;
    } else {
      return '';
    }
  }

  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef<HTMLInputElement>;
  @Output() valueChange = new EventEmitter<Date | null>();

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(delay(50), takeUntil(this.destroy$))
      .subscribe(() => this.setLocaleChange());

    this.dateStoreService.updateSelected$.pipe(takeUntil(this.destroy$)).subscribe((selectedDate) => {
      this.field.setValue(selectedDate);
      this.valueChange.emit(selectedDate);
      this.changeDetectorRef.markForCheck();
    });
  }

  private setLocaleChange(): void {
    const fieldValue = this.field.value;
    this.field.setValue('');
    timer(5)
      .pipe(take(1))
      .subscribe(() => {
        this.field.setValue(fieldValue);
      });
  }

  openCalendar(): void {
    this.dialogService.open(IccDatePickerComponent, {
      context: {
        fieldConfig: this.fieldConfig,
      },
      hostElemRef: this.calendarInput,
      injector: this.injector,
    });
  }

  public resetSelectedDate(selectedDate: Date | null) {
    this.dateStoreService.updateSelected(selectedDate);
  }

  clearSelectedDate(event: MouseEvent) {
    this.resetSelectedDate(null);
  }

  clearValue(): void {
    this.value = null;
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
  }
}
