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
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccSuffixDirective,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
} from '@icc/ui/form-field';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccRadioComponent } from '@icc/ui/radio';
import { Subject, takeUntil, timer, take } from 'rxjs';
import {
  defaultRadioGroupFieldConfig,
  IccRadioGroup,
  IccRadioGroupFieldConfig,
} from './models/radio-group-field.model';

@Component({
  selector: 'icc-radio-group-field',
  templateUrl: './radio-group-field.component.html',
  styleUrls: ['./radio-group-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccRadioGroupFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccRadioGroupFieldComponent),
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
    IccRadioComponent,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccRadioGroupFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccRadioGroupFieldConfig;
  private _value!: boolean;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccRadioGroupFieldConfig>) {
    this._fieldConfig = { ...defaultRadioGroupFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccRadioGroupFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccRadioGroupFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<boolean>(false),
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
  set value(val: boolean) {
    this._value = val;
    this.initForm({ ...defaultRadioGroupFieldConfig });
    this.field.setValue(val);
  }

  get value(): boolean {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<boolean>(true);

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  get hidden(): boolean {
    // not able to hide for the radio group if field is dirty
    return !!this.fieldConfig.hidden || (this.field.disabled && !!this.fieldConfig.readonlyHidden && !this.field.dirty);
  }

  get groups(): IccRadioGroup[] {
    return this.fieldConfig.groups;
  }

  getChecked(name: string): boolean {
    return name === this.field.value;
  }

  onChange(): void {
    this.valueChange.emit(this.field.value);
  }

  trackByIndex(index: number): number {
    return index;
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
