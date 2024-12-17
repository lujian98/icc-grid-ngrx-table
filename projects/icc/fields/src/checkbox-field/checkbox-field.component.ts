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
  OnInit,
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
import { TranslateModule } from '@ngx-translate/core';
import {
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccFieldWidthDirective,
  IccSuffixDirective,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { Subject, takeUntil, timer, take } from 'rxjs';
import { IccInputDirective } from '@icc/ui/form-field';
import { defaultCheckboxFieldConfig, IccCheckboxFieldConfig } from './models/checkbox-field.model';
import { IccCheckboxComponent } from '@icc/ui/checkbox';

@Component({
  selector: 'icc-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccCheckboxFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccCheckboxFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
    IccCheckboxComponent,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccCheckboxFieldComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccCheckboxFieldConfig;
  private _value!: boolean;

  @Input() disabled: boolean = false;
  @Input() showFieldFieldIndicator: boolean = true;

  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccCheckboxFieldConfig>) {
    this._fieldConfig = { ...defaultCheckboxFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccCheckboxFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccCheckboxFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<boolean>(false),
      });

      this.setEnableFields();
    }
    this.setFieldEditable();
  }

  private setFieldEditable(): void {
    timer(5)
      .pipe(take(1))
      .subscribe(() => {
        this.fieldConfig.editable ? this.field.enable() : this.field.disable();
        this.setEnableFields();
      });
  }

  ngOnInit(): void {
    if (this.field) {
      this.field.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.setEnableFields());
    }
  }

  @Input()
  set value(val: boolean) {
    this._value = val;
    this.initForm({ ...defaultCheckboxFieldConfig });
    this.field.setValue(val);
  }

  get value(): boolean {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<boolean>(true);
  //@Output() checkboxClick = new EventEmitter<boolean>(true);

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  get hidden(): boolean {
    return !!this.fieldConfig.hidden || (this.field.disabled && !!this.fieldConfig.readonlyHidden);
  }

  onChange(): void {
    this.field.markAsTouched();
    this.valueChange.emit(this.field.value);
    this.setEnableFields();
  }

  iccSuffixClick(event: MouseEvent): void {
    event.stopPropagation();
    const val = this.field.value; // ? true : false;
    this.field.patchValue(!val);
    this.changeDetectorRef.markForCheck();
  }

  private setEnableFields(): void {
    timer(20)
      .pipe(take(1))
      .subscribe(() => {
        this.setRequiredFields(this.field.value);
        this.setReadonlyFields(this.field.value);
      });
  }

  private setRequiredFields(checked: boolean): void {
    if (this.fieldConfig.requiredFields) {
      this.fieldConfig.requiredFields.forEach((name) => {
        const formField = this.form.get(name)!;
        if (formField) {
          if (checked) {
            formField.addValidators(Validators.required);
            formField.updateValueAndValidity();
          } else {
            formField.setErrors(null);
            formField.removeValidators(Validators.required);
          }
        }
      });
    }
  }

  private setReadonlyFields(checked: boolean): void {
    if (this.fieldConfig.readonlyFields) {
      this.fieldConfig.readonlyFields.forEach((name) => {
        const formField = this.form.get(name)!;
        if (formField) {
          if (checked && this.fieldConfig.editable) {
            formField.enable();
          } else {
            formField.setErrors(null);
            formField.disable();
          }
        }
      });
    }
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
