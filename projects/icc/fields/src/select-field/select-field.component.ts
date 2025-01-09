import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
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
import { TranslateModule } from '@ngx-translate/core';
import {
  IccAutocompleteComponent,
  IccAutocompleteContentDirective,
  IccAutocompleteDirective,
  IccFilterHighlightComponent,
} from '@icc/ui/autocomplete';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccFilterPipe, uniqueId } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccOptionComponent } from '@icc/ui/option';
import { Observable, Subject, filter, map, takeUntil, timer, take } from 'rxjs';
import {
  IccLabelDirective,
  IccSuffixDirective,
  IccLabelWidthDirective,
  IccFieldWidthDirective,
  IccFormFieldComponent,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
} from '@icc/ui/form-field';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { IccInputDirective } from '@icc/ui/form-field';
import { IccSelectFieldStateModule } from './+state/select-field-state.module';
import { IccSelectFieldFacade } from './+state/select-field.facade';
import { defaultSelectFieldConfig } from './models/default-select-field';
import { IccSelectFieldConfig } from './models/select-field.model';

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
    TranslateModule,
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
    IccFilterHighlightComponent,
    IccOptionComponent,
    IccIconModule,
    IccCheckboxComponent,
    IccFilterPipe,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccSelectFieldComponent<T> implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private selectFieldFacade = inject(IccSelectFieldFacade);
  private _fieldConfig!: IccSelectFieldConfig; // = defaultSelectFieldConfig;
  private _value!: any;
  private fieldId = uniqueId(16);
  private firstTimeLoad = true;

  fieldConfig$!: Observable<IccSelectFieldConfig | undefined>;
  selectOptions$!: Observable<any[]>;

  @Input() form!: FormGroup;
  @Input() showFieldEditIndicator: boolean = true;
  @Input()
  set fieldConfig(fieldConfig: Partial<IccSelectFieldConfig>) {
    //console.log(' 0000000000000 fieldConfig =', fieldConfig);
    if (fieldConfig.options) {
      this.options = [...fieldConfig.options];
      delete fieldConfig.options;
    }
    const config = { ...defaultSelectFieldConfig, ...fieldConfig };
    if (this.firstTimeLoad) {
      this.initFieldConfig(config);
    } else {
      this._fieldConfig = config;
    }
    this.setFieldEditable();
  }
  get fieldConfig(): IccSelectFieldConfig {
    return this._fieldConfig;
  }

  private initFieldConfig(fieldConfig: IccSelectFieldConfig): void {
    this.firstTimeLoad = false;
    this._fieldConfig = {
      ...fieldConfig,
      fieldId: this.fieldId,
    };
    this.selectFieldFacade.initFieldConfig(this.fieldId, this.fieldConfig);
    this.fieldConfig$ = this.selectFieldFacade.selectFieldConfig(this.fieldId).pipe(
      map((fieldConfig) => {
        this._fieldConfig = fieldConfig!;
        this.initSelectField();
        //console.log(' 22222222 fieldConfig =', fieldConfig);
        return fieldConfig;
      }),
    );
  }

  private setFieldEditable(): void {
    if (this.form) {
      // filter not working and need check this form
      timer(5)
        .pipe(take(1))
        .subscribe(() => (this.fieldConfig.editable ? this.field.enable() : this.field.disable()));
    }
  }

  private initSelectField(): void {
    if (this.fieldConfig?.viewportReady) {
      if (!this.selectOptions$) {
        this.selectOptions$ = this.selectFieldFacade.selectOptions(this.fieldId);
      }
      if (!this.form) {
        if (!this.form) {
          this.form = new FormGroup({
            [this.fieldConfig.fieldName!]: new FormControl<{ [key: string]: T }>({}),
          });
        }
        this.value = this.getInitValue(this.value);
        this.setFormvalue();
      }
    }
  }

  @Input()
  set options(val: { [key: string]: T }[] | string[]) {
    //console.log( ' 1111 options =', val)
    //local set option only, not used here
    const isStringsArray = val.every((item) => typeof item === 'string');
    //console.log( ' isStringsArray=', isStringsArray)
    if (!this.fieldConfig) {
      //console.log( ' 2222 options =', val)
      this.initFieldConfig({ ...defaultSelectFieldConfig });
    }

    if (this.fieldConfig.singleListOption || isStringsArray) {
      const options = (val as string[]).map((item: string) => {
        return {
          name: item,
          title: item,
        };
      });
      this.selectFieldFacade.setSelectFieldOptions(this.fieldId, options);
    } else {
      this.selectFieldFacade.setSelectFieldOptions(this.fieldId, val);
    }
  }

  @Input()
  set value(val: any) {
    //console.log( 'eeeeeeeeeeeeee val =', val)
    if (this.form && val !== undefined) {
      this._value = this.getInitValue(val);
      this.setFormvalue();
    } else {
      this._value = val;
    }
  }

  get value(): any {
    return this._value;
  }

  private setFormvalue(): void {
    //console.log( ' set form value =', this.value)
    this.selectedField.setValue(this.value);
  }

  private getInitValue(val: any): any {
    //console.log('aaaaaaa val=', val)
    let value: any = val;
    if (typeof val === 'string') {
      value = [val];
    } else if (typeof val === 'object' && !this.fieldConfig.multiSelection) {
      //console.log(' object val=', val);
      return val;
    }
    const isStringsArray = value.every((item: any) => typeof item === 'string');
    if ((this.fieldConfig.singleListOption || isStringsArray) && Array.isArray(value)) {
      value = [...value].map((item) => {
        if (typeof item === 'string') {
          return {
            name: item,
            title: item,
          };
        } else {
          return item;
        }
      });
    } else {
      value = value ? [...value] : value;
    }
    //console.log('bbbbbbbbbbbb val=', value)
    return value;
  }

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hidden(): boolean {
    return !!this.fieldConfig.hidden || (this.field.disabled && !!this.fieldConfig.readonlyHidden);
  }

  @Output() selectionChange = new EventEmitter<any>(true);
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  get selectedField(): AbstractControl {
    return this.form!.get(this.fieldConfig.fieldName!)!;
  }

  get hasValue(): boolean {
    const value = this.selectedField.value;
    return (value instanceof Array ? value.length > 0 : !!value) && !this.field.disabled;
  }

  get filterValue(): string {
    return typeof this.selectedField.value === 'object' ? '' : this.selectedField.value;
  }

  get toDisplay(): string {
    return this.autocomplete.toDisplay;
  }

  @ViewChild(IccAutocompleteComponent, { static: false }) autocomplete!: IccAutocompleteComponent<
    { [key: string]: T } | { [key: string]: T }[]
  >;

  displayFn(value: { [key: string]: string } | { [key: string]: string }[]): string {
    this.changeDetectorRef.markForCheck();
    //console.log('ddddddddd  this.fieldConfig.optionLabel=', this.fieldConfig.optionLabel)
    if (Array.isArray(value)) {
      //console.log('eeeeeeeeee  value=', value)
      if (value.length > 0) {
        return (
          value
            .map((item) => item[this.fieldConfig.optionLabel])
            .sort()
            //.sort((a, b) => (a && b) ? a.localeCompare(b) : 0)
            .join(', ')
        );
      } else {
        return '';
      }
    } else {
      return value ? value[this.fieldConfig.optionLabel] : '';
    }
  }

  compareFn(s1: { [key: string]: string }, s2: { [key: string]: string }): boolean {
    return s1 && s2 ? s1[this.fieldConfig.optionKey] === s2[this.fieldConfig.optionKey] : s1 === s2;
  }

  overlayOpen(event: boolean): void {
    this.isOverlayOpen = event;
    if (this.isOverlayOpen) {
      this.autocompleteClose = false;
    } else {
      //console.log( '5555555  close overlay this.form=', this.form)
    }
  }

  onChange(options: any): void {
    //console.log( 'qqqqqqqqqqqqqqq options=', options)
    if (this.fieldConfig.multiSelection) {
      this.selectionChange.emit([options]);
    } else {
      this.selectionChange.emit(options);
    }
  }

  closeOverlay(): void {
    this.autocompleteClose = true;
  }

  clearSelected(event: MouseEvent): void {
    event.stopPropagation();
    if (this.fieldConfig.multiSelection) {
      this.selectedField.setValue([]);
    } else {
      this.selectedField.setValue('');
    }
    this.changeDetectorRef.markForCheck();

    this.selectionChange.emit([]);
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
    //TODO value formant use setFormvalue ??
    this.form.patchValue(value, { emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { [this.fieldConfig.fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.selectFieldFacade.clearSelectFieldStore(this.fieldId);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
