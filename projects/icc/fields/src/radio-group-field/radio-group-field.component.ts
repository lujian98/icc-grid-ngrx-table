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
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { Subject, takeUntil } from 'rxjs';
import { IccInputDirective } from '../input/input.directive';
import { defaultRadioGroupFieldConfig, IccRadioGroupFieldConfig } from './models/radio-group-field.model';
import { IccRadioComponent } from '@icc/ui/radio';

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
    IccRadioComponent,
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

  get groups(): any[] {
    //console.log(' get groups =', this.fieldConfig.groups);
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
