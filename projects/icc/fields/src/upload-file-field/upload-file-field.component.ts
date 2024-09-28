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
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { Subject, takeUntil } from 'rxjs';
import { IccInputDirective } from '../input/input.directive';
import { defaultUploadFileFieldConfig, IccUploadFileFieldConfig } from './models/upload-file-field.model';

@Component({
  selector: 'icc-upload-file-field',
  templateUrl: './upload-file-field.component.html',
  styleUrls: ['./upload-file-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccUploadFileFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccUploadFileFieldComponent),
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
    IccFieldWidthDirective,
    IccInputDirective,
    IccIconModule,
    IccFieldsErrorsComponent,
  ],
})
export class IccUploadFileFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccUploadFileFieldConfig;
  private _value!: any;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccUploadFileFieldConfig>) {
    this._fieldConfig = { ...defaultUploadFileFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccUploadFileFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccUploadFileFieldConfig): void {
    if (!this.form) {
      this._fieldConfig = { ...fieldConfig };
      this.form = new FormGroup({
        [this.fieldConfig.fieldName!]: new FormControl<string>(''),
      });
    }
  }

  @Input()
  set value(val: any) {
    this._value = val;
    this.initForm({ ...defaultUploadFileFieldConfig });
    this.field.setValue(val);
  }

  get value(): any {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<any>(false);

  get field(): AbstractControl {
    return this.form!.get(this.fieldConfig.fieldName!)!;
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hasValue(): boolean {
    return !!this.field.value && !this.field.disabled;
  }

  onChange(): void {
    this.valueChange.emit(this.field.value);
  }

  onBlur(): void {}

  clearValue(): void {
    this.value = null;
    this.valueChange.emit(null);
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
