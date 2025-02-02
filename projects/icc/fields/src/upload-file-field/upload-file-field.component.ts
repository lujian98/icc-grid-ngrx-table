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
  ViewChild,
  ElementRef,
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
import { TranslatePipe } from '@ngx-translate/core';
import { IccUploadFileService } from '@icc/ui/core';
import {
  IccFormFieldComponent,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccFieldWidthDirective,
  IccSuffixDirective,
  IccFormFieldControlDirective,
  IccFormFieldErrorsDirective,
} from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccFieldsErrorsComponent } from '../field-errors/field-errors.component';
import { Subject, takeUntil, timer, take } from 'rxjs';
import { IccInputDirective } from '@icc/ui/form-field';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccFieldWidthDirective,
    IccInputDirective,
    IccIconModule,
    IccFormFieldErrorsDirective,
    IccFieldsErrorsComponent,
    IccFormFieldControlDirective,
  ],
})
export class IccUploadFileFieldComponent implements OnDestroy, ControlValueAccessor, Validator {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private uploadFileService = inject(IccUploadFileService);
  private destroy$ = new Subject<void>();
  private _fieldConfig!: IccUploadFileFieldConfig;
  private _value!: string;
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
    this.setFieldEditable();
  }

  private setFieldEditable(): void {
    timer(5)
      .pipe(take(1))
      .subscribe(() => (this.fieldConfig.editable ? this.field.enable() : this.field.disable()));
  }

  @Input()
  set value(val: string) {
    this._value = val;
    this.initForm({ ...defaultUploadFileFieldConfig });
    this.field.setValue(val);
  }

  get value(): string {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<string>(false);
  @Output() selectUploadFile = new EventEmitter<File | null>(false);

  get field(): FormControl {
    return this.form!.get(this.fieldConfig.fieldName!)! as FormControl;
  }

  get required(): boolean {
    return this.field.hasValidator(Validators.required) && !this.field.disabled;
  }

  get hidden(): boolean {
    return !!this.fieldConfig.hidden || (this.field.disabled && !!this.fieldConfig.readonlyHidden);
  }

  get hasValue(): boolean {
    return !!this.field.value && !this.field.disabled;
  }

  @ViewChild('fileInput') fileInput?: ElementRef;

  get selectedFile(): File | null {
    if (this.fileInput?.nativeElement.files.length > 0) {
      return this.fileInput?.nativeElement.files[0];
    } else {
      return null;
    }
  }

  onChange(event: Event): void {
    //var files = event.target.files;
    this.field.markAsTouched();
    this.valueChange.emit(this.field.value);
    // TODO still need use uploadFileService.formUploadFileChanged ?? for from field save with upload file???
    this.uploadFileService.formUploadFileChanged(this.fieldConfig.fieldName!, this.selectedFile);
    this.selectUploadFile.emit(this.selectedFile);
  }

  clearValue(): void {
    this.value = '';
    this.field.markAsPristine();
    this.valueChange.emit('');
    this.selectUploadFile.emit(this.selectedFile);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  registerOnTouched(fn: (value: string) => void): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: { [key: string]: string }): void {
    this.form.patchValue(value, { emitEvent: false });
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { [this.fieldConfig.fieldName!]: true };
  }

  ngOnDestroy(): void {
    this.uploadFileService.uploadFiles = [];
    this.destroy$.next();
    this.destroy$.complete();
  }
}
