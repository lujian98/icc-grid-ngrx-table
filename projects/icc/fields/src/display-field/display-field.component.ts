import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
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
import {
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccFormFieldControlDirective,
  IccInputDirective,
  IccLabelDirective,
  IccLabelWidthDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { take, timer } from 'rxjs';
import { defaultDisplayFieldConfig, IccDisplayFieldConfig } from './models/display-field.model';

@Component({
  selector: 'icc-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccDisplayFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccDisplayFieldComponent),
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
    IccInputDirective,
    IccIconModule,
    IccFormFieldControlDirective,
  ],
})
export class IccDisplayFieldComponent implements ControlValueAccessor, Validator {
  onChanged: Function = () => {};
  onTouched: Function = () => {};
  form = input(new FormGroup({}), { transform: (form: FormGroup) => form });
  showFieldEditIndicator = input<boolean>(true);
  fieldConfig = input.required({
    transform: (config: Partial<IccDisplayFieldConfig>) => {
      const fieldConfig = { ...defaultDisplayFieldConfig, ...config };
      this.initForm(fieldConfig);
      return fieldConfig;
    },
  });
  value = input('', {
    transform: (value: string) => {
      this.field.setValue(value);
      return value;
    },
  });

  private initForm(fieldConfig: IccDisplayFieldConfig): void {
    if (!this.form().get(fieldConfig.fieldName!)) {
      this.form().addControl(fieldConfig.fieldName!, new FormControl<string>(''));
    }
    timer(5)
      .pipe(take(1))
      .subscribe(() => this.field.disable());
  }

  get field(): FormControl {
    return this.form().get(this.fieldConfig().fieldName!)! as FormControl;
  }

  get hidden(): boolean {
    return !!this.fieldConfig().hidden || (this.field.disabled && !!this.fieldConfig().readonlyHidden);
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

  writeValue(value: { [key: string]: string }): void {
    this.form().patchValue(value, { emitEvent: false });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form().valid ? null : { [this.fieldConfig().fieldName!]: true };
  }
}
