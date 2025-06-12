import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  input,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
  inject,
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
  IccAutocompleteComponent,
  IccAutocompleteContentDirective,
  IccAutocompleteDirective,
} from '@icc/ui/autocomplete';
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
import { TranslatePipe } from '@ngx-translate/core';
import { Observable, Subject, map, take, takeUntil, timer } from 'rxjs';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccSelectFieldStateModule } from './+state/select-field-state.module';
import { IccSelectFieldFacade } from './+state/select-field.facade';
import { IccSelectOptionComponent } from './components/select-option.component';
import { defaultSelectFieldConfig } from './models/default-select-field';
import { IccOptionType, IccSelectFieldConfig, IccSelectFieldSetting } from './models/select-field.model';

@Component({
  selector: 'icc-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccSelectFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IccSelectFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    IccSelectFieldStateModule,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccInputDirective,
    IccAutocompleteComponent,
    IccAutocompleteDirective,
    IccAutocompleteContentDirective,
    IccIconModule,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
    IccSelectOptionComponent,
  ],
})
export class IccSelectFieldComponent<T, G> implements OnDestroy, ControlValueAccessor, Validator {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();
  private selectFieldFacade = inject(IccSelectFieldFacade);
  private _value!: string | string[] | object[];
  private fieldId = `select-${crypto.randomUUID()}`;
  private firstTimeLoad = true;
  setSelected: boolean = false;
  fieldConfig$ = this.selectFieldFacade.getFieldConfig(this.fieldId);

  fieldSetting$!: Observable<IccSelectFieldSetting | undefined>;
  fieldSetting!: IccSelectFieldSetting;
  selectOptions$!: Observable<IccOptionType[]>; //{ [key: string]: T }[] | string[]

  form = input(new FormGroup({}), { transform: (form: FormGroup) => form });
  showFieldEditIndicator = input<boolean>(true);
  fieldConfig = input.required({
    transform: (config: Partial<IccSelectFieldConfig>) => {
      const fieldConfig = { ...defaultSelectFieldConfig, ...config };
      this.selectFieldFacade.initFieldConfig(this.fieldId, fieldConfig);

      if (fieldConfig.options) {
        this.options = [...fieldConfig.options] as string[] | object[];
        //delete config.options;
      }
      if (this.firstTimeLoad) {
        this.initFieldConfig(fieldConfig);
      }
      this.setFieldEditable();

      return fieldConfig;
    },
  });

  private initFieldConfig(fieldConfig: IccSelectFieldConfig): void {
    this.firstTimeLoad = false;
    this.fieldSetting$ = this.selectFieldFacade.selectSetting(this.fieldId).pipe(
      map((fieldSetting) => {
        this.fieldSetting = fieldSetting!;
        this.initSelectField(fieldConfig);
        if (!this.form().get(fieldConfig.fieldName!)) {
          this.form().addControl(fieldConfig.fieldName!, new FormControl<string>(''));
        }
        this.setFormvalue();
        return fieldSetting;
      }),
    );
  }

  private setFieldEditable(): void {
    if (this.form() && this.field) {
      // filter not working and need check this form
      timer(5)
        .pipe(take(1))
        .subscribe(() => {
          return this.fieldConfig$().editable ? this.field.enable() : this.field.disable();
        });
    }
  }

  private initSelectField(fieldConfig: IccSelectFieldConfig): void {
    if (this.fieldSetting?.viewportReady) {
      if (!this.selectOptions$) {
        this.selectOptions$ = this.selectFieldFacade.selectOptions(this.fieldId);
      }
    }
  }

  @Input()
  set options(val: IccOptionType[]) {
    //WARNING local set option only, only add field config if no initial input fieldconfig
    timer(5)
      .pipe(take(1))
      .subscribe(() => {
        if (!this.fieldConfig$()) {
          this.initFieldConfig({ ...defaultSelectFieldConfig });
        }
        this.selectFieldFacade.setSelectFieldOptions(this.fieldId, val);
      });
    this.selectFieldFacade.setSelectFieldOptions(this.fieldId, val);
  }

  value = input('', {
    transform: (value: string | object | string[] | object[]) => {
      this.field?.setValue(value);
      return value;
    },
  });

  private setFormvalue(): void {
    this.field?.setValue(this.value());
  }

  get field(): FormControl {
    return this.form()?.get(this.fieldConfig$().fieldName!)! as FormControl;
  }

  get fieldValue(): T[] {
    return this.field.value instanceof Array ? this.field.value : [this.field.value];
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hidden(): boolean {
    return !!this.fieldConfig$().hidden || (this.field.disabled && !!this.fieldConfig$().readonlyHidden);
  }

  get hasValue(): boolean {
    const value = this.field.value;
    return (value instanceof Array ? value.length > 0 : !!value) && !this.field.disabled;
  }

  constructor() {
    this.selectFieldFacade.initFieldConfig(this.fieldId, defaultSelectFieldConfig);
  }

  @Output() valueChange = new EventEmitter<T | T[]>(true);

  @ViewChild(IccAutocompleteComponent, { static: false })
  autocompleteComponent!: IccAutocompleteComponent<{ [key: string]: T } | { [key: string]: T }[], G>;
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;
  clickedOption: string | undefined;
  onClickedOption(clickedOption: string) {
    this.clickedOption = clickedOption;
  }
  onAutocompleteClose(close: boolean): void {
    this.autocompleteClose = close;
  }
  onSelectOptionValueChange(value: T | T[]): void {
    //this.value = value as string | string[] | object[];
    this.field.setValue(value);
    this.valueChange.emit(value);
  }

  displayFn(value: string | { [key: string]: string } | { [key: string]: string }[]): string {
    this.changeDetectorRef.markForCheck();
    if (this.fieldConfig$().displayWith) {
      return this.fieldConfig$().displayWith!(this.value());
    }
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return (
          value
            .map((item) => {
              return this.fieldSetting.singleListOption ? item : item[this.fieldConfig$().optionLabel];
            })
            .sort()
            //.sort((a, b) => (a && b) ? a.localeCompare(b) : 0)
            .join(', ')
        );
      } else {
        return '';
      }
    } else {
      if (this.fieldSetting.singleListOption) {
        return value as string;
      } else {
        return value ? (value as { [key: string]: string })[this.fieldConfig$().optionLabel] : '';
      }
    }
  }

  compareFn(s1: { [key: string]: string }, s2: { [key: string]: string }): boolean {
    if (this.fieldSetting.singleListOption) {
      return s1 && s2 && s1 === s2;
    } else {
      return s1 && s2 ? s1[this.fieldConfig$().optionKey] === s2[this.fieldConfig$().optionKey] : s1 === s2;
    }
  }

  overlayOpen(event: boolean): void {
    this.isOverlayOpen = event;
    if (this.isOverlayOpen) {
      this.autocompleteClose = false;
      this.setSelected = true;
    } else if (!this.fieldConfig$().multiSelection) {
      this.valueChange.emit(this.field.value);
    }
  }

  onChange(): void {
    if (this.fieldConfig$().multiSelection) {
      this.valueChange.emit(this.fieldValue);
      this.setSelected = false;
    }
  }

  closeOverlay(): void {
    this.autocompleteClose = true;
  }

  clearSelected(event: MouseEvent): void {
    event.stopPropagation();
    if (this.fieldConfig$().multiSelection) {
      this.field.setValue([]);
      this.valueChange.emit([]);
    } else {
      this.field.setValue('');
      this.valueChange.emit('' as T);
    }
    this.changeDetectorRef.markForCheck();
    this.setSelected = false;
  }

  registerOnChange(fn: (value: string[] | object[]) => void): void {
    //this.form().valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: (value: string[] | object[]) => void): void {
    //this.form().valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form().disable() : this.form().enable();
  }

  writeValue(value: { [key: string]: string[] | object[] }): void {
    this.form().patchValue(value, { emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form().valid ? null : { [this.fieldConfig$().fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.selectFieldFacade.clearSelectFieldStore(this.fieldId);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
