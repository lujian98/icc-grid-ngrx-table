import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IccButtonComponent } from '@icc/ui/button';
import { IccButtonConfg, IccButtonType, IccObjectType, IccUploadFileService, isEqual } from '@icc/ui/core';
import {
  IccFieldsComponent,
  IccFieldsetComponent,
  IccFieldsetConfig,
  IccFormField,
  IccNumberFieldConfig,
  IccTextFieldConfig,
} from '@icc/ui/fields';
import { IccFormLabelWidthDirective } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutHeaderComponent } from '@icc/ui/layout';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { IccFormFacade } from '../+state/form.facade';
import { IccFormButtonClick, IccFormConfig, IccFormSetting } from '../models/form.model';

@Component({
  selector: 'icc-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    IccFieldsetComponent,
    IccFormLabelWidthDirective,
    IccFieldsComponent,
    IccLayoutHeaderComponent,
    IccButtonComponent,
    IccIconModule,
  ],
})
export class IccFormViewComponent implements OnInit, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly uploadFileService = inject(IccUploadFileService);
  private readonly formFacade = inject(IccFormFacade);
  private readonly destroy$ = new Subject<void>();
  form: FormGroup = new FormGroup({});
  FieldType = IccObjectType;
  formSetting = input.required<IccFormSetting>();
  formConfig = input.required<IccFormConfig>();
  formFields = input([], {
    transform: (formFields: IccFormField[]) => {
      this.addFormControls(formFields);
      if (this.formConfig().validators) {
        this.form.addValidators(this.formConfig().validators!);
      }
      if (this.values()) {
        this.form.patchValue(this.values()!);
      }
      return formFields;
    },
  });
  values = input(undefined, {
    transform: (values: object) => {
      if (this.form && values) {
        this.form.patchValue({ ...values });
      }
      return values;
    },
  });
  formButtonClick = output<IccFormButtonClick>();

  private addFormControls(formFields: IccFormField[]): void {
    formFields.forEach((field) => {
      if (field.fieldType === 'fieldset') {
        this.addFormControls((field as IccFieldsetConfig).formFields);
      } else if (!this.form.get(field.fieldName!)) {
        this.form.addControl(field.fieldName!, new FormControl<string>({ value: '', disabled: !!field.readonly }, []));
        this.setValidators(field);
      }
    });
  }

  private setValidators(field: IccFormField): void {
    const formField = this.form.get(field.fieldName!)!;

    if (field.validators) {
      formField.addValidators(field.validators);
    }

    if (field.required) {
      formField.addValidators(Validators.required);
    }

    if (field.fieldType === 'text' || field.fieldType === 'textarea' || field.fieldType === 'password') {
      const f = field as IccTextFieldConfig;
      if (f.minLength || f.minLength === 0) {
        formField.addValidators(Validators.minLength(f.minLength));
      }
      if (f.maxLength || f.maxLength === 0) {
        formField.addValidators(Validators.maxLength(f.maxLength));
      }
    }

    if (field.fieldType === 'number') {
      const f = field as IccNumberFieldConfig;
      if (f.minValue || f.minValue === 0) {
        formField.addValidators(Validators.min(f.minValue));
      }
      if (f.maxValue || f.maxValue === 0) {
        formField.addValidators(Validators.max(f.maxValue));
      }
    }
  }

  private getFieldType(key: string, formFields: IccFormField[]): string {
    let fieldType = '';
    const find = formFields.find((field) => field.fieldName === key);
    if (find) {
      return find.fieldType;
    }
    formFields.forEach((field) => {
      if (field.fieldType === 'fieldset' && fieldType === '') {
        fieldType = this.getFieldType(key, (field as IccFieldsetConfig).formFields);
      }
    });
    return fieldType;
  }

  get buttons(): IccButtonConfg[] {
    return [...this.formConfig().buttons].map((button) => {
      return {
        ...button,
        hidden: this.buttonHidden(button),
        disabled: this.buttonDisabled(button),
      };
    });
  }

  getButtonTitle(item: IccButtonConfg): string {
    return item.title === undefined ? item.name : item.title;
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((values) => this.checkFormValueChanged(values));
    this.uploadFileService.uploadFiles = [];
  }

  private checkFormValueChanged(values: object): void {
    if (this.values()) {
      isEqual(values, this.values()) ? this.form.markAsPristine() : this.form.markAsDirty();
      this.setFieldDirty(values, this.values()!);
      this.changeDetectorRef.markForCheck();
    }
  }

  private setFieldDirty<T>(values: object, orgValues: object): void {
    Object.keys(values).forEach((key) => {
      const formField = this.form.get(key)!;
      const isequal = isEqual((values as { [key: string]: T })[key], (orgValues as { [key: string]: T })[key]);
      if (isequal) {
        formField.markAsPristine();
      } else {
        formField.markAsDirty();
      }
    });
  }

  buttonHidden(button: IccButtonConfg): boolean {
    switch (button.name) {
      case IccButtonType.View:
      case IccButtonType.Reset:
      case IccButtonType.Save:
        //case IccButtonType.UploadFile:
        return !this.formSetting().editing;
      case IccButtonType.Edit:
      default:
        return this.formSetting().editing;
    }
  }

  buttonDisabled(button: IccButtonConfg): boolean {
    switch (button.name) {
      case IccButtonType.View:
        return this.form.dirty;
      case IccButtonType.Reset:
        return !this.form.dirty;
      case IccButtonType.Save:
        return !(this.form.dirty && this.form.valid);
      //case IccButtonType.UploadFile:
      //  return !(this.form.dirty && this.form.valid && this.uploadFileService.uploadFiles.length > 0);
      case IccButtonType.Edit:
      default:
        return false;
    }
  }

  buttonClick(button: IccButtonConfg): void {
    this.formFacade.setFormEditable(this.formSetting().formId, button);
    switch (button.name) {
      case IccButtonType.Edit:
        this.editForm(button);
        break;
      case IccButtonType.Refresh:
        this.refreshForm();
        break;
      case IccButtonType.Reset:
        this.resetForm();
        break;
      case IccButtonType.Save:
        this.saveForm();
        break;
      //case IccButtonType.UploadFile:
      //this.uploadFile();
      //  break;
      case IccButtonType.View:
      default:
        break;
    }

    this.formButtonClick.emit({
      button: button,
      formData: this.form.getRawValue(),
    });
  }

  private editForm(button: IccButtonConfg): void {
    this.checkFormValueChanged(this.form.getRawValue());
  }

  private refreshForm(): void {
    this.formFacade.getFormData(this.formSetting().formId, this.formConfig());
  }

  private resetForm(): void {
    this.form.patchValue({ ...this.values() });
    this.uploadFileService.uploadFiles = [];
    this.changeDetectorRef.markForCheck();
  }

  private saveForm(): void {
    if (this.form.valid) {
      this.formFacade.saveFormData(this.formSetting().formId, this.formConfig(), this.form.getRawValue());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
