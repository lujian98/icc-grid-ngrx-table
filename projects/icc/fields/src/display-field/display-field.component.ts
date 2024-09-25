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
import {
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccSuffixDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccInputDirective } from '../input/input.directive';
import { defaultDisplayFieldConfig, IccDisplayFieldConfig } from './models/display-field.model';

@Component({
  selector: 'icc-display-field',
  templateUrl: './display-field.component.html',
  //styleUrls: ['./display-field.component.scss'],
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
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccInputDirective,
    IccIconModule,
  ],
})
export class IccDisplayFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  //private changeDetectorRef = inject(ChangeDetectorRef);
  //private destroy$ = new Subject<void>();
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

  get field(): AbstractControl {
    return this.form!.get(this.fieldConfig.fieldName!)!;
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

  ngOnDestroy(): void {
    //this.destroy$.next();
    //this.destroy$.complete();
  }
}
