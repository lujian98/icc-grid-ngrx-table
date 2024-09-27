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
import {
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccFieldWidthDirective,
  IccSuffixDirective,
  IccErrorDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { Subject, takeUntil } from 'rxjs';
import { IccInputDirective } from '../input/input.directive';
//import { defaultFieldErrorFieldConfig, IccFieldErrorFieldConfig } from './models/field-errors.model';

@Component({
  selector: 'icc-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
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
    IccErrorDirective,
  ],
})
export class IccFieldsErrorsComponent implements OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  /*
  private _fieldConfig!: IccFieldErrorFieldConfig;
  private _value!: string;
  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(fieldConfig: Partial<IccFieldErrorFieldConfig>) {
    this._fieldConfig = { ...defaultFieldErrorFieldConfig, ...fieldConfig };
    this.initForm(this.fieldConfig);
  }
  get fieldConfig(): IccFieldErrorFieldConfig {
    return this._fieldConfig;
  }

  private initForm(fieldConfig: IccFieldErrorFieldConfig): void {
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
    this.initForm({ ...defaultFieldErrorFieldConfig });
    this.field.setValue(val);
  }

  get value(): string {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<string>(false);

  get field(): AbstractControl {
    return this.form!.get(this.fieldConfig.fieldName!)!;
  }

  get hasValue(): boolean {
    return !!this.field.value || this.field.value === 0;
  }

  onChange(): void {
    this.valueChange.emit(this.field.value);
  }

  onBlur(): void {}

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
*/
  ngOnDestroy(): void {
    //this.destroy$.next();
    //this.destroy$.complete();
  }
}
