import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  Output,
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
import { IccCalendarModule } from '@icc/ui/calendar';
import { IccLocaleDatePipe } from '@icc/ui/core';
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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { delay, Subject, take, takeUntil, timer } from 'rxjs';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { defaultDateFieldConfig, IccDateFieldConfig } from './models/date-field.model';

@Component({
  selector: 'icc-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccInputDirective,
    IccIconModule,
    IccCalendarModule,
    IccLocaleDatePipe,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccDateFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccDateFieldConfig;
  private _value!: Date | string;
  @Input() form!: FormGroup;

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
  set value(val: Date | string) {
    this._value = val;
    this.initForm({ ...defaultDateFieldConfig });
    this.field.setValue(val);
  }

  get value(): Date | string {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<Date | string>(undefined);

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

  constructor() {
    this.translateService.onLangChange
      .pipe(delay(50), takeUntil(this.destroy$))
      .subscribe(() => this.setLocaleChange());
  }

  private setLocaleChange(): void {
    const fieldValue = this.field.value;
    this.field.setValue('');
    timer(5)
      .pipe(take(1))
      .subscribe(() => this.field.setValue(fieldValue));
  }

  onChange(val: Date): void {
    this.field.markAsTouched();
    this.valueChange.emit(val);
  }

  clearValue(): void {
    this.value = '';
    this.valueChange.emit('');
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: any): void {
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
