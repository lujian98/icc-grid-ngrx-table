import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
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
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import {
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
  IccLabelDirective,
  IccLabelWidthDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { defaultCheckboxFieldConfig, IccCheckboxFieldConfig } from './models/checkbox-field.model';

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
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    IccFormFieldComponent,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccIconModule,
    IccCheckboxComponent,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccCheckboxFieldComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();
  onChanged: Function = () => {};
  onTouched: Function = () => {};
  form = input(new FormGroup({}), { transform: (form: FormGroup) => form });
  showFieldEditIndicator = input<boolean>(true);
  disabled = input<boolean>(false);
  fieldConfig = input.required({
    transform: (config: Partial<IccCheckboxFieldConfig>) => {
      const fieldConfig = { ...defaultCheckboxFieldConfig, ...config };
      this.initForm(fieldConfig);
      return fieldConfig;
    },
  });
  value = input(false, {
    transform: (value: boolean) => {
      this.field.setValue(value);
      return value;
    },
  });
  valueChange = output<boolean>();

  private initForm(fieldConfig: IccCheckboxFieldConfig): void {
    if (!this.form().get(fieldConfig.fieldName!)) {
      this.form().addControl(fieldConfig.fieldName!, new FormControl<boolean>(false));
      this.setEnableFields();
    }
    timer(5)
      .pipe(take(1))
      .subscribe(() => {
        //this.setDisabledState(!this.fieldConfig().editable);
        !this.fieldConfig().editable ? this.field.disable() : this.field.enable();
        this.setEnableFields();
      });
  }

  ngOnInit(): void {
    if (this.field) {
      this.field.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.setEnableFields());
    }
  }

  get field(): FormControl {
    return this.form().get(this.fieldConfig().fieldName!)! as FormControl;
  }

  get hidden(): boolean {
    return !!this.fieldConfig().hidden || (this.field.disabled && !!this.fieldConfig().readonlyHidden);
  }

  onChange(): void {
    this.field.markAsTouched();
    this.valueChange.emit(this.field.value);
    this.setEnableFields();
  }

  iccSuffixClick(event: MouseEvent): void {
    event.stopPropagation();
    const val = this.field.value;
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
    if (this.fieldConfig().requiredFields) {
      this.fieldConfig().requiredFields!.forEach((name) => {
        const formField = this.form().get(name)!;
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
    if (this.fieldConfig().readonlyFields) {
      this.fieldConfig().readonlyFields!.forEach((name) => {
        const formField = this.form().get(name)!;
        if (formField) {
          if (checked && this.fieldConfig().editable) {
            formField.enable();
          } else {
            formField.setErrors(null);
            formField.disable();
          }
        }
      });
    }
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

  writeValue(value: { [key: string]: boolean }): void {
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
