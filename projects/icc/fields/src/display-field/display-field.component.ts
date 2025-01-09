import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import {
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccFormFieldControlDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { timer, take } from 'rxjs';
import { IccInputDirective } from '@icc/ui/form-field';
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
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
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
  private _fieldConfig!: IccDisplayFieldConfig;
  private _value!: string;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccDisplayFieldConfig>) {
    this._fieldConfig = { ...defaultDisplayFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccDisplayFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccDisplayFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<string>(''),
      });
    }
    this.setFieldEditable();
  }

  private setFieldEditable(): void {
    timer(5)
      .pipe(take(1))
      .subscribe(() => this.field.disable());
  }

  @Input()
  set value(val: string) {
    this._value = val;
    this.initForm({ ...defaultDisplayFieldConfig });
    this.field.setValue(val);
  }

  get value(): string {
    return this._value;
  }

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  get hidden(): boolean {
    return !!this.fieldConfig.hidden || (this.field.disabled && !!this.fieldConfig.readonlyHidden);
  }

  registerOnChange(fn: any): void {
    //this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    //this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    //isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: any): void {
    //this.form.patchValue(value, { emitEvent: false });
    //this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
    //return this.form.valid ? null : { [this.fieldConfig.fieldName!]: true };
  }
}
