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
import {
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccFieldWidthDirective,
  IccSuffixDirective,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
} from '@icc/ui/form-field';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccIconModule } from '@icc/ui/icon';
import { Subject, takeUntil, timer, take } from 'rxjs';
import { IccInputDirective } from '@icc/ui/form-field';
import { defaultNumberFieldConfig, IccNumberFieldConfig } from './models/number-field.model';

@Component({
  selector: 'icc-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccNumberFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccNumberFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccInputDirective,
    IccIconModule,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccNumberFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccNumberFieldConfig;
  private _value!: number | null;

  @Input() form!: FormGroup;
  @Input() showFieldEditIndicator: boolean = true;
  @Input()
  set fieldConfig(fieldConfig: Partial<IccNumberFieldConfig>) {
    this._fieldConfig = { ...defaultNumberFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccNumberFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccNumberFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<number | null>(null),
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
  set value(val: number | null) {
    this._value = val;
    this.initForm({ ...defaultNumberFieldConfig });
    this.field.setValue(val);
  }

  get value(): number | null {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<number | null>();

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
    return (!!this.field.value || this.field.value === 0) && !this.field.disabled;
  }

  onChange(): void {
    this.field.markAsTouched();
    this.valueChange.emit(this.field.value);
  }

  clearValue(): void {
    this.value = null;
    this.valueChange.emit(null);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: (value: number) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: { [key: string]: number }): void {
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
