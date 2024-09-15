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
import { IccIconModule } from '@icc/ui/icon';
import { Subject, takeUntil } from 'rxjs';
import { IccLabelDirective, IccSuffixDirective, IccFormFieldComponent, IccInputDirective } from '@icc/ui/form-field';

@Component({
  selector: 'icc-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
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
  ],
})
export class TextFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private _value!: string;
  private _fieldName: string = '';
  form!: FormGroup;

  @Input() fieldLabel: string | undefined;
  @Input() placeholder: string = '';

  @Input()
  set fieldName(val: string) {
    this._fieldName = val;
    this.form = new FormGroup({
      [this.fieldName]: new FormControl<string>(''),
    });
  }

  get fieldName(): string {
    return this._fieldName;
  }
  @Input()
  set value(val: string) {
    this._value = val;
    this.field.setValue(val);
  }

  get value(): string {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<string>(true);

  get field(): AbstractControl {
    return this.form!.get(this.fieldName)!;
  }

  get hasValue(): boolean {
    return !!this.field.value;
  }

  onChange(): void {
    //console.log('qqqqqqqqqqqqqqq onChange=', this.field.value);
    this.valueChange.emit(this.field.value);
  }

  onBlur(): void {}

  clearSelected(): void {
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
    return this.form.valid ? null : { [this.fieldName]: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
