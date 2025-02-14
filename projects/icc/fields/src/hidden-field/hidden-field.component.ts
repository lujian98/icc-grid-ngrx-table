import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy } from '@angular/core';
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
} from '@angular/forms';
import { IccFormFieldComponent, IccInputDirective } from '@icc/ui/form-field';
import { Subject, takeUntil } from 'rxjs';
import { defaultHiddenFieldConfig, IccHiddenFieldConfig } from './models/hidden-field.model';

@Component({
  selector: 'icc-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccHiddenFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccHiddenFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IccFormFieldComponent, IccInputDirective],
})
export class IccHiddenFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccHiddenFieldConfig;
  private _value!: string;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccHiddenFieldConfig>) {
    this._fieldConfig = { ...defaultHiddenFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccHiddenFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccHiddenFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<string>(''),
      });
    }
  }

  @Input()
  set value(val: string) {
    this._value = val;
    this.initForm({ ...defaultHiddenFieldConfig });
    this.field.setValue(val);
  }

  get value(): string {
    return this._value;
  }

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: (value: string) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: { [key: string]: string }): void {
    this.form.patchValue(value, { emitEvent: false });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { [this.fieldConfig.fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
