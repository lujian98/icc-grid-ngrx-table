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
import { IccFormFieldComponent, IccLabelDirective, IccSuffixDirective } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { Subject, takeUntil } from 'rxjs';
import { IccInputDirective } from '../input/input.directive';
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
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccInputDirective,
    IccIconModule,
    IccCheckboxComponent,
  ],
})
export class IccCheckboxFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccCheckboxFieldConfig;
  private _value!: boolean;
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

  get field(): AbstractControl {
    return this.form!.get(this.fieldConfig.fieldName!)!;
  }

  onChange(): void {
    console.log(' on change=', this.field.value);
    this.valueChange.emit(this.field.value);
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
