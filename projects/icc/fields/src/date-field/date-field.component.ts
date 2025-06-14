import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
  output,
  ViewChild,
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
import {
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
  IccInputDirective,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccSuffixDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccDialogService } from '@icc/ui/overlay';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { delay, Subject, take, takeUntil, timer } from 'rxjs';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccDatePickerComponent } from './date-picker/date-picker.component';
import { defaultDateFieldConfig, IccDateFieldConfig } from './models/date-field.model';
import { IccDateStoreService } from './services/date-store.service';

@Component({
  selector: 'icc-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    IccIconModule,
    IccFormFieldComponent,
    IccButtonComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccInputDirective,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccDateFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccDateFieldComponent),
      multi: true,
    },
    IccDateStoreService,
    provideNativeDateAdapter(),
  ],
})
export class IccDateFieldComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly translateService = inject(TranslateService);
  private readonly dialogService = inject(IccDialogService);
  private readonly injector = inject(Injector);
  private readonly dateStoreService = inject(IccDateStoreService);
  private readonly destroy$ = new Subject<void>();
  onChanged: Function = () => {};
  onTouched: Function = () => {};
  form = input(new FormGroup({}), { transform: (form: FormGroup) => form });
  showFieldEditIndicator = input<boolean>(true);
  fieldConfig = input.required({
    transform: (config: Partial<IccDateFieldConfig>) => {
      const fieldConfig = { ...defaultDateFieldConfig, ...config };
      this.initForm(fieldConfig);
      return fieldConfig;
    },
  });
  value = input(null, {
    transform: (value: Date | null) => {
      this.field.setValue(value);
      this.dateStoreService.updateSelected(value);
      return value;
    },
  });
  valueChange = output<Date | null>();

  private initForm(fieldConfig: IccDateFieldConfig): void {
    if (!this.form().get(fieldConfig.fieldName!)) {
      this.form().addControl(fieldConfig.fieldName!, new FormControl<Date | string>(''));
    }
    timer(5)
      .pipe(take(1))
      .subscribe(() => this.setDisabledState(!this.fieldConfig().editable));
  }

  get field(): FormControl {
    return this.form().get(this.fieldConfig().fieldName!)! as FormControl;
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hidden(): boolean {
    return !!this.fieldConfig().hidden || (this.field.disabled && !!this.fieldConfig().readonlyHidden);
  }

  get hasValue(): boolean {
    return !!this.field.value && !this.field.disabled;
  }

  get display(): string {
    const date = this.field.value;
    if (date) {
      const locale = this.translateService.currentLang || 'en-US';
      return new DatePipe(locale).transform(date, this.fieldConfig().dateFormat)!;
    } else {
      return '';
    }
  }

  @ViewChild('calendarInput', { static: false }) calendarInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(delay(50), takeUntil(this.destroy$))
      .subscribe(() => this.setLocaleChange());

    this.dateStoreService.updateSelected$.pipe(takeUntil(this.destroy$)).subscribe((selectedDate) => {
      this.field.setValue(selectedDate);
      this.valueChange.emit(selectedDate);
      this.changeDetectorRef.markForCheck();
    });
  }

  private setLocaleChange(): void {
    const fieldValue = this.field.value;
    this.field.setValue('');
    timer(5)
      .pipe(take(1))
      .subscribe(() => {
        this.field.setValue(fieldValue);
      });
  }

  openCalendar(): void {
    this.dialogService.open(IccDatePickerComponent, {
      context: {
        fieldConfig: this.fieldConfig(),
        field: this.field,
      },
      hostElemRef: this.calendarInput,
      injector: this.injector,
    });
  }

  public resetSelectedDate(selectedDate: Date | null) {
    this.dateStoreService.updateSelected(selectedDate);
  }

  clearSelectedDate(event: MouseEvent) {
    this.resetSelectedDate(null);
  }

  clearValue(): void {
    this.field.setValue(null);
    this.valueChange.emit(null);
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

  writeValue(value: { [key: string]: Date }): void {
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
